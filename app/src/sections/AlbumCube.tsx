import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { albumCubeConfig } from '../config';
import { ArrowRight, Code2, Brain, Workflow, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CubeProps {
  rotationProgress: number;
}

const Cube = ({ rotationProgress }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const textures = useTexture(albumCubeConfig.cubeTextures);

  // Responsive cube size
  const cubeSize = Math.min(viewport.width * 0.35, 2.5);

  useFrame(() => {
    if (meshRef.current) {
      // Map rotation progress (0-1) to rotation angles
      const targetRotationY = rotationProgress * Math.PI * 2;
      const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.2;

      // Smooth interpolation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.3}
          metalness={0.2}
        />
      ))}
    </mesh>
  );
};

const SERVICE_ICONS = [Code2, Brain, Workflow, Lightbulb];

const AlbumCube = () => {
  // Null check: if config is empty, do not render
  if (albumCubeConfig.albums.length === 0 || albumCubeConfig.cubeTextures.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setRotationProgress(progress);

        // Calculate current album index
        const albumIndex = Math.min(
          Math.floor(progress * 4),
          albumCubeConfig.albums.length - 1
        );
        setCurrentAlbumIndex(albumIndex);

        // Velocity-based blur effect
        const velocity = Math.abs(self.getVelocity());
        const targetBlur = Math.min(velocity / 500, 8);
        const targetSpacing = Math.min(velocity / 100, 30);

        setBlurAmount(prev => prev + (targetBlur - prev) * 0.2);
        setLetterSpacing(prev => prev + (targetSpacing - prev) * 0.2);
      },
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  const currentAlbum = albumCubeConfig.albums[currentAlbumIndex];
  const CurrentIcon = SERVICE_ICONS[currentAlbumIndex] || Code2;

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative w-full h-screen bg-transparent overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at ${30 + rotationProgress * 40}% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Background title with blur effect */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          filter: `blur(${blurAmount}px)`,
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <h2 className="font-display text-[18vw] text-white/[0.03] uppercase whitespace-nowrap select-none">
          {currentAlbum.subtitle}
        </h2>
      </div>

      {/* Section label */}
      <div className="absolute top-12 left-12 z-30">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2">
          <span className="text-xs font-mono-custom uppercase tracking-wider text-neon-cyan">
            Nuestros Servicios
          </span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-4xl">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1.2}
                castShadow
              />
              <spotLight
                position={[-10, -10, -10]}
                angle={0.15}
                penumbra={1}
                intensity={0.6}
                color="#9DC4FF"
              />
              <pointLight position={[0, 0, 5]} intensity={0.6} color="#00D4FF" />
              <Cube rotationProgress={rotationProgress} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Service info overlay */}
      <div 
        ref={infoRef}
        className="absolute bottom-12 left-12 z-20 max-w-md"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
            <CurrentIcon className="w-5 h-5 text-neon-cyan" />
          </div>
          <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider">
            Servicio {String(currentAlbum.id).padStart(2, '0')} / {String(albumCubeConfig.albums.length).padStart(2, '0')}
          </p>
        </div>
        
        <h3 className="font-display text-4xl md:text-5xl text-white mb-3 transition-all duration-300 leading-tight">
          {currentAlbum.title}
        </h3>
        
        <p className="font-mono-custom text-sm text-white/60 mb-4 leading-relaxed">
          {currentAlbum.description}
        </p>

        <button 
          onClick={scrollToContact}
          className="group inline-flex items-center gap-2 text-neon-cyan hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">Saber más</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {albumCubeConfig.albums.map((album, index) => (
            <div
              key={album.id}
              className={`w-1 rounded-full transition-all duration-500 ${
                index === currentAlbumIndex
                  ? 'bg-neon-cyan h-12'
                  : 'bg-white/20 h-4 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 right-12 z-20 text-right">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider mb-1">
          {albumCubeConfig.scrollHint}
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-neon-cyan/50 ml-auto" />
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-12 left-12 w-20 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent" />
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </section>
  );
};

export default AlbumCube;
