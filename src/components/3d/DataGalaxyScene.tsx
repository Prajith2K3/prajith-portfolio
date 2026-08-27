import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ANALYTICAL_TOKENS = ['SQL', 'PYTHON', 'POWER BI', '0.68 ROC-AUC', '$4.64M', '7.06x ROAS', 'DAX', 'CTEs'];

function PrecisionSphereNodes({ count = 35, paused = false }: { count?: number; paused?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
    const silver = new THREE.Color('#E2E8F0'), blue = new THREE.Color('#0071E3'), white = new THREE.Color('#FFFFFF');
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI, phi = Math.acos(2 * Math.random() - 1), r = 2.2 + Math.random() * 0.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); pos[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() > 0.75 ? blue : Math.random() > 0.35 ? silver : white;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);
  useFrame((state) => { if (!paused && pointsRef.current) pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04; });
  return <points ref={pointsRef}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /><bufferAttribute attach="attributes-color" args={[colors, 3]} /></bufferGeometry><pointsMaterial size={0.07} vertexColors transparent opacity={0.7} sizeAttenuation /></points>;
}

function PrecisionDataObject({ paused }: { paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => { if (!paused && groupRef.current) { const t = state.clock.getElapsedTime(); groupRef.current.rotation.y = t * 0.06; groupRef.current.rotation.z = Math.cos(t * 0.04) * 0.08; } });
  return <group ref={groupRef}>
    <mesh><sphereGeometry args={[3, 16, 16]} /><meshBasicMaterial wireframe color="#D2D2D7" transparent opacity={0.25} /></mesh>
    <mesh rotation={[0.4, 0.4, 0]}><octahedronGeometry args={[1.6]} /><meshStandardMaterial color="#F5F5F7" roughness={0.45} transparent opacity={0.3} /></mesh>
    <mesh><sphereGeometry args={[0.45, 16, 16]} /><meshStandardMaterial color="#0071E3" emissive="#0071E3" emissiveIntensity={0.5} roughness={0.3} /></mesh>
  </group>;
}

function FloatingAnalyticalTokens({ reduced, paused }: { reduced: boolean; paused: boolean }) {
  const tokens = reduced ? ANALYTICAL_TOKENS.slice(0, 4) : ANALYTICAL_TOKENS;
  return <group>{tokens.map((token, idx) => {
    const angle = (idx / tokens.length) * Math.PI * 2, radius = 3.3 + (idx % 2) * 0.4;
    return <Float key={token} enabled={!paused} speed={0.7} rotationIntensity={0.12} floatIntensity={0.3}>
      <Text position={[Math.cos(angle) * radius, Math.sin(idx * 1.4) * 1.5, Math.sin(angle) * radius]} fontSize={0.2} color={idx % 3 === 0 ? '#0071E3' : '#475569'} anchorX="center" anchorY="middle" outlineWidth={0.003} outlineColor="#FFFFFF">{token}</Text>
    </Float>;
  })}</group>;
}

export const DataGalaxyScene: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lowMemory = 'deviceMemory' in navigator && Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory) <= 4;
      setIsLowPower(coarse || reduced || lowMemory);
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch { setWebglSupported(false); }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0, rootMargin: '150px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!webglSupported) return <div className="w-full h-full flex items-center justify-center opacity-40"><div className="w-64 h-64 rounded-full border border-[#D2D2D7]" /></div>;

  const paused = !isVisible || isLowPower;
  return <div ref={containerRef} className="w-full h-[360px] md:h-[500px] relative perf-layer" aria-label="Interactive data visualization">
    <Canvas camera={{ position: [0, 0, 7.2], fov: 48 }} dpr={isLowPower ? 1 : [1, 1.2]} gl={{ antialias: !isLowPower, alpha: true, powerPreference: 'high-performance' }} frameloop={paused ? 'demand' : 'always'} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.8} /><directionalLight position={[10, 10, 10]} intensity={1.2} color="#FFFFFF" /><pointLight position={[-10, -10, -10]} intensity={0.6} color="#0071E3" />
      <PrecisionDataObject paused={paused} /><PrecisionSphereNodes count={isLowPower ? 24 : 40} paused={paused} /><FloatingAnalyticalTokens reduced={isLowPower} paused={paused} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!paused} autoRotateSpeed={0.35} maxPolarAngle={Math.PI / 1.9} minPolarAngle={Math.PI / 2.4} />
    </Canvas>
  </div>;
};
