import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";

const OrbitPage = lazy(() => import("./pages/orbit/OrbitPage"));
const AtlasPage = lazy(() => import("./pages/atlas/AtlasPage"));

export default function App() {
  const isOrbit = /^\/productos\/orbit\/?$/.test(window.location.pathname);
  const isNexo = /^\/productos\/nexo\/?$/.test(window.location.pathname);
  if (isOrbit) return (
    <Suspense fallback={<main className="route-loading" aria-busy="true" aria-label="Cargando Orbit" />}>
      <OrbitPage />
    </Suspense>
  );
  if (isNexo) return (
    <Suspense fallback={<main className="route-loading" aria-busy="true" aria-label="Cargando Nexo" />}>
      <AtlasPage />
    </Suspense>
  );
  return <HomePage />;
}
