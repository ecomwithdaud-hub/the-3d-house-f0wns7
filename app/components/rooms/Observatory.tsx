"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface ObservatoryProps {
  position?: [number, number, number];
  onContactClick?: () => void;
}

export function Observatory({ position = [54, 0, 0], onContactClick }: ObservatoryProps) {
  const globeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const [hoveredPortal, setHoveredPortal] = useState(false);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.2;
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Warm Ambient Starlight Lighting */}
      <spotLight
        position={[0, 8, 2]}
        intensity={45}
        angle={0.65}
        penumbra={0.8}
        color="#fbbf24"
        castShadow
      />
      <pointLight position={[0, 2.2, 0]} intensity={16} color="#f59e0b" distance={6} />
      <pointLight position={[-4, 2, -3]} intensity={12} color="#fb923c" distance={7} />
      <pointLight position={[4, 2, -3]} intensity={12} color="#ea580c" distance={7} />

      {/* Floating Stardust / Cosmic Sparkles in Observatory */}
      <Sparkles count={40} scale={10} size={2.5} speed={0.4} opacity={0.6} color="#fbbf24" />

      {/* Panoramic Back Glass Window Frame overlooking the cosmos */}
      <group position={[0, 3.5, -5.5]}>
        {/* Dark Frame */}
        <mesh>
          <boxGeometry args={[16, 7, 0.4]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.7} metalness={0.6} />
        </mesh>
        {/* Cosmic Glass Viewport */}
        <mesh position={[0, 0, 0.22]}>
          <planeGeometry args={[13.5, 5.8]} />
          <meshPhysicalMaterial
            color="#030712"
            emissive="#1e1b4b"
            emissiveIntensity={0.35}
            roughness={0.1}
            metalness={0.1}
            transmission={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* Floor Deck Platform */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[14, 0.1, 11]} />
        <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Glowing Warm Floor Perimeter Inlay */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.32, 64]} />
        <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} />
      </mesh>

      {/* Central Holographic Console Table */}
      <group position={[0, 0, 0]}>
        {/* Table Base */}
        <mesh position={[0, 0.5, 0]} receiveShadow>
          <cylinderGeometry args={[1.6, 1.9, 0.9, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.25} metalness={0.9} />
        </mesh>

        {/* Console Bezel Ring */}
        <mesh position={[0, 0.96, 0]}>
          <cylinderGeometry args={[1.65, 1.65, 0.06, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.95} />
        </mesh>

        {/* Hologram Emitter Lens in table center */}
        <mesh position={[0, 0.995, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.2, 32]} />
          <meshBasicMaterial color="#d97706" />
        </mesh>

        {/* Projected Holographic Rotating Celestial Globe */}
        <group position={[0, 2.2, 0]}>
          {/* Hologram wireframe globe */}
          <group ref={globeRef}>
            <mesh>
              <sphereGeometry args={[0.7, 24, 24]} />
              <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.55} />
            </mesh>
            {/* Core energy beacon */}
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
          </group>

          {/* Orbital Satellite Rings */}
          <group ref={ringRef}>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[1.1, 0.015, 16, 64]} />
              <meshBasicMaterial color="#f59e0b" transparent opacity={0.7} />
            </mesh>
            <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
              <torusGeometry args={[0.92, 0.012, 16, 64]} />
              <meshBasicMaterial color="#fdba74" transparent opacity={0.6} />
            </mesh>
          </group>

          {/* Light projection cone from table to hologram */}
          <mesh position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.1, 1.2, 32, 1, true]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* Interactive Holographic Transmission Portal Hub */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group
          position={[0, 3.6, 0]}
          onClick={onContactClick}
          onPointerOver={() => setHoveredPortal(true)}
          onPointerOut={() => setHoveredPortal(false)}
        >
          <Html distanceFactor={11} center>
            <div
              className={`cursor-pointer transition-all duration-300 rounded-xl bg-slate-950/90 px-4 py-2.5 font-mono text-center backdrop-blur border shadow-2xl ${
                hoveredPortal
                  ? "border-amber-400 text-amber-200 scale-105 shadow-amber-500/20"
                  : "border-amber-500/40 text-amber-300 shadow-amber-500/10"
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                SPACE 04 // OBSERVATORY
              </div>
              <div className="mt-1 text-[10px] text-amber-200/80">
                [CLICK TO OPEN TRANSMISSION DIALOG]
              </div>
            </div>
          </Html>
        </group>
      </Float>

      {/* Social Uplink Nodes */}
      <group position={[2.8, 1.4, 1.8]}>
        <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.25}>
          <Html distanceFactor={10} position={[0, 0, 0]}>
            <div className="flex flex-col gap-1.5 font-mono text-[10px]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded bg-slate-900/90 px-2.5 py-1 text-slate-300 border border-slate-700/60 hover:border-amber-400 hover:text-amber-300 transition-all flex items-center gap-1.5 backdrop-blur"
              >
                <span>↗</span> GITHUB / MONOFORM
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="rounded bg-slate-900/90 px-2.5 py-1 text-slate-300 border border-slate-700/60 hover:border-amber-400 hover:text-amber-300 transition-all flex items-center gap-1.5 backdrop-blur"
              >
                <span>↗</span> LINKEDIN / CONNECT
              </a>
            </div>
          </Html>
        </Float>
      </group>
    </group>
  );
}
