"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface VaultProps {
  position?: [number, number, number];
  onAccessVault?: () => void;
}

export function Vault({ position = [36, 0, 0], onAccessVault }: VaultProps) {
  const quantumCoreRef = useRef<THREE.Group>(null);
  const gearDoorRef = useRef<THREE.Group>(null);
  const laserPointersRef = useRef<THREE.Group>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [hoveredConsole, setHoveredConsole] = useState(false);

  // Animations: spinning quantum core and oscillating security lasers
  useFrame((state, delta) => {
    if (quantumCoreRef.current) {
      quantumCoreRef.current.rotation.y += delta * 0.9;
      quantumCoreRef.current.rotation.x += delta * 0.3;
    }
    if (gearDoorRef.current) {
      gearDoorRef.current.rotation.z += delta * (unlocked ? 0.8 : 0.05);
    }
    if (laserPointersRef.current) {
      const t = state.clock.getElapsedTime();
      laserPointersRef.current.position.y = Math.sin(t * 2) * 0.15;
    }
  });

  const handleTerminalClick = () => {
    setUnlocked((prev) => !prev);
    onAccessVault?.();
  };

  return (
    <group position={position}>
      {/* Vault Atmospheric Lighting */}
      <spotLight
        position={[0, 8, 3]}
        intensity={50}
        angle={0.6}
        penumbra={0.7}
        color="#34d399"
        castShadow
      />
      <pointLight position={[0, 2, 0]} intensity={18} color="#10b981" distance={6} />
      <pointLight position={[-4, 1.5, -2]} intensity={10} color="#065f46" distance={6} />
      <pointLight position={[4, 1.5, -2]} intensity={10} color="#059669" distance={6} />

      {/* Back Vault Blast Wall */}
      <group position={[0, 3.5, -5.5]}>
        <mesh receiveShadow>
          <boxGeometry args={[16, 7, 0.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.8} />
        </mesh>
      </group>

      {/* Massive Reinforced Circular Vault Door Portal in the back wall */}
      <group position={[0, 3.2, -5.0]}>
        {/* Outer Heavy Steel Bezel */}
        <mesh receiveShadow>
          <cylinderGeometry args={[2.8, 2.8, 0.35, 48]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Gear Teeth Ring on Vault Door */}
        <group ref={gearDoorRef}>
          <mesh>
            <torusGeometry args={[2.5, 0.15, 16, 32]} />
            <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.2} />
          </mesh>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[0.2, 0.35, 0.2]} />
                <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.25} />
              </mesh>
            );
          })}
        </group>

        {/* Central Vault Lock Dial & Status Light */}
        <mesh position={[0, 0, 0.22]}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
          <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.34]}>
          <circleGeometry args={[0.3, 32]} />
          <meshBasicMaterial color={unlocked ? "#10b981" : "#ef4444"} />
        </mesh>
      </group>

      {/* Titanium Floor Plating & Hazard Inlay */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 10]} />
        <meshStandardMaterial color="#090e17" roughness={0.4} metalness={0.85} />
      </mesh>

      {/* Floor Warning Grid Lines */}
      {[-3, -1, 1, 3].map((x, i) => (
        <mesh key={i} position={[x, 0.11, 0]}>
          <boxGeometry args={[0.06, 0.01, 8]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Magnetic Containment Hexagonal Pedestal */}
      <mesh position={[0, 0.45, 0]} receiveShadow>
        <cylinderGeometry args={[2.1, 2.4, 0.8, 6]} />
        <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.2} />
      </mesh>
      {/* Floor glow ring under containment */}
      <mesh position={[0, 0.86, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
      </mesh>

      {/* 4 Vertical High-Voltage Magnetic Pylons */}
      {[
        [-1.3, -1.3],
        [1.3, -1.3],
        [-1.3, 1.3],
        [1.3, 1.3],
      ].map(([x, z], idx) => (
        <group key={idx} position={[x, 1.25, z]}>
          {/* Pylon Column */}
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.14, 1.6, 16]} />
            <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Magnetic Emitter Tip */}
          <mesh position={[0, 0.82, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
        </group>
      ))}

      {/* Suspended Encrypted Quantum Core */}
      <group position={[0, 2.1, 0]}>
        <group ref={quantumCoreRef}>
          {/* Torus Energy Ring */}
          <mesh>
            <torusGeometry args={[0.6, 0.08, 16, 48]} />
            <meshStandardMaterial
              color="#059669"
              emissive="#10b981"
              emissiveIntensity={1.2}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>
          {/* Inner Quantum Octahedron */}
          <mesh>
            <octahedronGeometry args={[0.35, 0]} />
            <meshPhysicalMaterial
              color="#6ee7b7"
              emissive="#059669"
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.3}
              transmission={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      </group>

      {/* Security Laser Array */}
      <group ref={laserPointersRef}>
        {[-1.6, 0, 1.6].map((offset, idx) => (
          <group key={idx} position={[offset, 1.8 + idx * 0.4, 3.2]} rotation={[0, 0, Math.PI / 2]}>
            {/* Laser beam */}
            <mesh>
              <cylinderGeometry args={[0.008, 0.008, 5, 8]} />
              <meshBasicMaterial color={unlocked ? "#10b981" : "#ef4444"} transparent opacity={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Interactive Cryptographic Terminal Console */}
      <group
        position={[2.4, 1.1, 2.5]}
        rotation={[0, -0.6, 0]}
        onClick={handleTerminalClick}
        onPointerOver={() => setHoveredConsole(true)}
        onPointerOut={() => setHoveredConsole(false)}
      >
        {/* Terminal Stand */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 1.4, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Terminal Screen Face */}
        <mesh position={[0, 0.72, 0.05]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
          <meshStandardMaterial
            color="#022c22"
            emissive={hoveredConsole ? "#10b981" : "#065f46"}
            emissiveIntensity={hoveredConsole ? 0.9 : 0.4}
            roughness={0.2}
          />
        </mesh>
        {/* Interactive UI Tooltip */}
        <Html distanceFactor={9} position={[0, 1.25, 0]}>
          <div
            className={`cursor-pointer transition-all duration-300 rounded bg-slate-950/95 px-3 py-1.5 font-mono text-[10px] backdrop-blur border whitespace-nowrap shadow-xl ${
              unlocked
                ? "border-emerald-400 text-emerald-300"
                : "border-red-500/50 text-red-400 animate-pulse"
            }`}
          >
            {unlocked ? "SECURE ACCESS: GRANTED [CLICK TO LOCK]" : "SECURITY ARMED [CLICK TO BYPASS]"}
          </div>
        </Html>
      </group>

      {/* Overhead Vault Signage */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, 4.8, -4.6]}>
          <Html distanceFactor={14} center>
            <div className="pointer-events-none select-none rounded bg-black/90 px-3.5 py-1.5 font-mono text-[11px] text-emerald-400 backdrop-blur border border-emerald-500/40 whitespace-nowrap tracking-widest shadow-2xl">
              VAULT 03 // LEVEL 5 ENCRYPTION
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}
