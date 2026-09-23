import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";

const OrbitPage = lazy(() => import("./pages/orbit/OrbitPage"));
const AtlasPage = lazy(() => import("./pages/atlas/AtlasPage"));

export default function App() {
  const isOrbit = /^\/productos\/orbit\/?$/.test(window.location.pathname);
  const isAtlas = /^\/productos\/atlas\/?$/.test(window.location.pathname);
  if (isOrbit) return (
    <Suspense fallback={<main className="route-loading" aria-busy="true" aria-label="Cargando Orbit" />}>
      <OrbitPage />
    </Suspense>
  );
  if (isAtlas) return (
    <Suspense fallback={<main className="route-loading" aria-busy="true" aria-label="Cargando Atlas" />}>
      <AtlasPage />
    </Suspense>
  );
  return <HomePage />;
}
