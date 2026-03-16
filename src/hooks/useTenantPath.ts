import { useParams } from "react-router-dom";

/**
 * Returns a function that prefixes paths with /t/:tenantSlug when
 * the current route is inside a tenant slug context.
 *
 * Usage:
 *   const tp = useTenantPath();
 *   navigate(tp(`/bank/${bankId}`));  // → "/t/acme/bank/nordea" or "/bank/nordea"
 */
export function useTenantPath() {
  const { tenantSlug } = useParams<{ tenantSlug?: string }>();

  return (path: string) => {
    if (tenantSlug) {
      return `/t/${tenantSlug}${path.startsWith("/") ? path : `/${path}`}`;
    }
    return path;
  };
}
