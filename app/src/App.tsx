import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";

const OrbitPage = lazy(() => import("./pages/orbit/OrbitPage"));

export default function App() {
  const isOrbit = /^\/productos\/orbit\/?$/.test(window.location.pathname);
  return isOrbit ? (
    <Suspense fallback={<main className="route-loading" aria-busy="true" aria-label="Cargando Orbit" />}>
      <OrbitPage />
    </Suspense>
  ) : <HomePage />;
}
