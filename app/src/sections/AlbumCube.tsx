import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Brain, Code2, Lightbulb, Workflow } from 'lucide-react';
import { albumCubeConfig } from '../config';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

interface CubeProps {
  rotationProgress: number;
}

const Cube = ({ rotationProgress }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const textures = useTexture(albumCubeConfig.cubeTextures);
  const cubeSize = Math.min(viewport.width * 0.42, 3.25);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetRotationY = rotationProgress * Math.PI * 1.6;
    const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.18;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.08);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.08);
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial key={index} attach={`material-${index}`} map={texture} roughness={0.15} metalness={0.05} />
      ))}
    </mesh>
  );
};

const SERVICE_ICONS = [Code2, Brain, Workflow, Lightbulb];

const AlbumCube = () => {
  if (albumCubeConfig.albums.length === 0 || albumCubeConfig.cubeTextures.length === 0) {
    return null;
  }

  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? 'top 92%' : 'top 80%',
      end: isMobile ? 'bottom 8%' : 'bottom 20%',
      scrub: reducedMotion ? false : isMobile ? 0.35 : 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setRotationProgress(progress);

        const albumIndex = Math.min(
          Math.floor(progress * albumCubeConfig.albums.length),
          albumCubeConfig.albums.length - 1
        );
        setCurrentAlbumIndex(albumIndex);
      },
    });

    return () => st.kill();
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="relative w-full overflow-hidden bg-transparent py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
              Nuestros Servicios
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[var(--fg)] sm:text-4xl">
              Soluciones tecnológicas a la medida
            </h2>
            <p className="mt-2 max-w-md text-base leading-8 text-[var(--muted)]">
              Diseño moderno, ejecución rápida y experiencia de navegación fluida.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="service-item relative min-h-[360px] lg:min-h-[460px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-8 top-10 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute bottom-12 right-10 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
            </div>

            <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[470px]">
              <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.9], fov: 44 }} gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.95} />
                  <hemisphereLight args={['#e0f2fe', '#0f172a', 0.45]} />
                  <spotLight position={[8, 8, 8]} angle={0.2} penumbra={1} intensity={1.0} />
                  <spotLight position={[-8, -8, -8]} angle={0.2} penumbra={1} intensity={0.7} color="#9DC4FF" />
                  <pointLight position={[0, 0, 4]} intensity={0.75} color="#00D4FF" />
                  <Cube rotationProgress={rotationProgress} />
                </Suspense>
              </Canvas>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {albumCubeConfig.albums.map((album, index) => {
              const Icon = SERVICE_ICONS[index] || Code2;
              const isActive = index === currentAlbumIndex;
              const shortDescription =
                album.description.length > 100 ? `${album.description.slice(0, 100).trimEnd()}...` : album.description;

              return (
                <article
                  key={album.id}
                  className={`service-item rounded-xl border p-3.5 transition-all duration-300 ${
                    isActive
                      ? 'border-cyan-500/35 bg-cyan-500/10 dark:bg-cyan-500/15'
                      : 'border-[var(--line)] bg-[var(--bg-card)] md:hover:border-[var(--line-strong)]'
                  }`}
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-700 dark:text-cyan-200">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-mono-custom uppercase tracking-wider text-[var(--muted)]">
                      {String(album.id).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--fg)] sm:text-base">{album.title}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-300">
                    {album.subtitle}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">{shortDescription}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumCube;
