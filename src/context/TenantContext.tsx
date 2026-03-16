import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface TenantConfig {
  tenantSlug: string;
  displayName: string;
  allowedBanks: string[];
  config: Record<string, any>;
  wsUrl: string;
  channel: string;
}

interface TenantContextValue {
  tenant: TenantConfig | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextValue>({
  tenant: null,
  loading: true,
  error: null,
});

const GATEWAY_API =
  import.meta.env.VITE_GATEWAY_API_URL ??
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : "");

async function resolveBySlug(slug: string): Promise<TenantConfig> {
  const res = await fetch(`${GATEWAY_API}/api/auth/resolve-slug/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Tenant not found (${res.status})`);
  }
  const data = await res.json();
  return {
    tenantSlug: data.tenantSlug,
    displayName: data.displayName,
    allowedBanks: data.allowedBanks ?? [],
    config: data.config ?? {},
    wsUrl: data.wsUrl ?? "",
    channel: data.channel ?? data.config?.defaultChannel ?? "",
  };
}

async function resolveByDomain(domain: string): Promise<TenantConfig> {
  const res = await fetch(
    `${GATEWAY_API}/api/auth/resolve-domain?domain=${encodeURIComponent(domain)}`
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Tenant not found (${res.status})`);
  }
  const data = await res.json();
  return {
    tenantSlug: data.tenantSlug,
    displayName: data.displayName,
    allowedBanks: data.allowedBanks ?? [],
    config: data.config ?? {},
    wsUrl: data.wsUrl ?? `wss://${window.location.host}/ws`,
    channel: data.channel ?? data.config?.defaultChannel ?? "",
  };
}

/**
 * Resolves the current tenant from either:
 * 1. URL path: /t/:slug/... (slug-based)
 * 2. Custom domain hostname (domain-based)
 * 3. Env var VITE_TENANT_SLUG (dev override)
 */
export function TenantProvider({
  slug,
  children,
}: {
  slug?: string;
  children: ReactNode;
}) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      try {
        setLoading(true);
        setError(null);

        // Priority 1: explicit slug from route param or env var
        const targetSlug = slug || import.meta.env.VITE_TENANT_SLUG;

        // Priority 2: resolve by custom domain (skip for localhost/dev)
        const hostname = window.location.hostname;
        const isLocal = ["localhost", "127.0.0.1", "::1"].includes(hostname);

        if (!targetSlug && isLocal) {
          // No resolution needed — dev mode with no tenant
          if (!cancelled) {
            setTenant(null);
            setLoading(false);
          }
          return;
        }

        let config: TenantConfig;
        if (targetSlug) {
          config = await resolveBySlug(targetSlug);
        } else {
          config = await resolveByDomain(hostname);
        }

        if (!cancelled) {
          // Override WS URL from env if set
          if (import.meta.env.VITE_QR_WS_URL) {
            config.wsUrl = import.meta.env.VITE_QR_WS_URL;
          }
          if (import.meta.env.VITE_QR_CHANNEL) {
            config.channel = import.meta.env.VITE_QR_CHANNEL;
          }
          setTenant(config);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Failed to resolve tenant");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
