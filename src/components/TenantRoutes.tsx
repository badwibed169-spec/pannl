import { useParams, Outlet } from "react-router-dom";
import { TenantProvider, useTenant } from "@/context/TenantContext";

/**
 * Wraps child routes in a TenantProvider using the :tenantSlug route param.
 * Renders a loading/error state while tenant is being resolved.
 */
export default function TenantRoutes() {
  const { tenantSlug } = useParams<{ tenantSlug: string }>();

  return (
    <TenantProvider slug={tenantSlug}>
      <TenantGate />
    </TenantProvider>
  );
}

function TenantGate() {
  const { loading, error } = useTenant();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(220_15%_12%)]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(220_15%_12%)]">
        <div className="text-center max-w-sm mx-4">
          <p className="text-red-400 text-lg font-semibold mb-2">Tenant Not Found</p>
          <p className="text-white/50 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
