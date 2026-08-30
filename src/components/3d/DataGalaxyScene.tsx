import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Subdued Apple-inspired analytical tokens
const ANALYTICAL_TOKENS = [
  "SQL", "PYTHON", "POWER BI", "0.68 ROC-AUC", "$4.64M", "7.06x ROAS",
  "DAX", "CTEs", "5,000 RECORDS", "PREDICTIVE MODELING"
];

// Silver / White Node Network inside the Sphere
function PrecisionSphereNodes({ count = 75 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const slate = new THREE.Color("#8E8E93");
    const appleBlue = new THREE.Color("#0071E3");
    const darkSlate = new THREE.Color("#1D1D1F");

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const choice = Math.random();
      const chosenColor = choice > 0.7 ? appleBlue : choice > 0.35 ? slate : darkSlate;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// Precision Silver Glass Geometric Data Object
function PrecisionDataObject() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
      groupRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.04) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Frosted Silver Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[3.0, 24, 24]} />
        <meshStandardMaterial
          wireframe
          color="#A1A1A6"
          transparent
          opacity={0.4}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Frosted Octahedron Core */}
      <mesh rotation={[0.4, 0.4, 0]}>
        <octahedronGeometry args={[1.6]} />
        <meshPhysicalMaterial
          color="#E5E5EA"
          roughness={0.2}
          transmission={0.6}
          thickness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Core Precision Blue Sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#0071E3"
          emissive="#0071E3"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Floating Analytical Text Tokens
function FloatingAnalyticalTokens() {
  return (
    <group>
      {ANALYTICAL_TOKENS.map((token, idx) => {
        const angle = (idx / ANALYTICAL_TOKENS.length) * Math.PI * 2;
        const radius = 3.3 + (idx % 2) * 0.4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(idx * 1.4) * 1.5;
        const z = Math.sin(angle) * radius;

        return (
          <Float key={idx} speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
            <Text
              position={[x, y, z]}
              fontSize={0.22}
              color={idx % 3 === 0 ? "#0071E3" : "#1D1D1F"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.015}
              outlineColor="#FFFFFF"
            >
              {token}
            </Text>
          </Float>
        );
      })}
    </group>
  );
}

export const DataGalaxyScene: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center relative opacity-40">
        <div className="w-64 h-64 rounded-full border border-[#D2D2D7] animate-pulse absolute" />
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] md:h-[550px] relative">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} color="#FFFFFF" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#0071E3" />

          <PrecisionDataObject />
          <PrecisionSphereNodes count={75} />
          <FloatingAnalyticalTokens />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.9}
            minPolarAngle={Math.PI / 2.4}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
