"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface GalleryProps {
  position?: [number, number, number];
  onSelectArtwork?: (title: string) => void;
}

export function Gallery({ position = [18, 0, 0], onSelectArtwork }: GalleryProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const [hoveredArt, setHoveredArt] = useState<string | null>(null);

  // Multi-axis gyroscopic rotation animation
  useFrame((state, delta) => {
    if (outerRingRef.current) outerRingRef.current.rotation.z += delta * 0.45;
    if (midRingRef.current) midRingRef.current.rotation.x += delta * 0.65;
    if (innerRingRef.current) innerRingRef.current.rotation.y += delta * 0.85;

    if (crystalRef.current) {
      crystalRef.current.rotation.x += delta * 0.5;
      crystalRef.current.rotation.y += delta * 0.7;
      // Gentle floating pulse
      const t = state.clock.getElapsedTime();
      crystalRef.current.position.y = 1.9 + Math.sin(t * 1.5) * 0.12;
    }
  });

  const artworks = [
    {
      id: "art-1",
      title: "QUANTUM HORIZON",
      artist: "Studio Monoform",
      pos: [-5.8, 2.8, 0] as [number, number, number],
      rot: [0, Math.PI / 2, 0] as [number, number, number],
      color: "#ec4899",
      accent: "#a855f7",
    },
    {
      id: "art-2",
      title: "SYNTHETIC DREAMS",
      artist: "Echo Lab",
      pos: [0, 3.2, -5.4] as [number, number, number],
      rot: [0, 0, 0] as [number, number, number],
      color: "#8b5cf6",
      accent: "#6366f1",
    },
    {
      id: "art-3",
      title: "NEURAL TOPOLOGY",
      artist: "Vector One",
      pos: [5.8, 2.8, 0] as [number, number, number],
      rot: [0, -Math.PI / 2, 0] as [number, number, number],
      color: "#d946ef",
      accent: "#ec4899",
    },
  ];

  return (
    <group position={position}>
      {/* Mood Spotlights for Gallery */}
      <spotLight
        position={[0, 7.5, 0]}
        intensity={45}
        angle={0.5}
        penumbra={0.7}
        color="#c084fc"
        castShadow
      />
      <pointLight position={[0, 2, 0]} intensity={18} color="#a855f7" distance={6} />
      <pointLight position={[-4, 3, -4]} intensity={10} color="#ec4899" distance={7} />
      <pointLight position={[4, 3, -4]} intensity={10} color="#6366f1" distance={7} />

      {/* Gallery Back Wall & Gallery Architecture */}
      <group position={[0, 3.5, -5.5]}>
        <mesh receiveShadow>
          <boxGeometry args={[16, 7, 0.6]} />
          <meshStandardMaterial color="#09090b" roughness={0.9} metalness={0.1} />
        </mesh>
      </group>

      {/* Side Exhibition Partition Walls */}
      <mesh position={[-6.2, 3.5, 0]} receiveShadow>
        <boxGeometry args={[0.6, 7, 11]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[6.2, 3.5, 0]} receiveShadow>
        <boxGeometry args={[0.6, 7, 11]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Museum Ceiling Truss Frame */}
      <group position={[0, 7.2, 0]}>
        <mesh>
          <boxGeometry args={[13, 0.15, 11]} />
          <meshStandardMaterial color="#050508" roughness={0.8} />
        </mesh>
        {/* Soft square recessed skylight with dark violet diffuse */}
        <mesh position={[0, -0.05, 0]}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial color="#581c87" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Gallery Floor Pedestal */}
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <cylinderGeometry args={[1.8, 2.1, 0.7, 32]} />
        <meshStandardMaterial color="#121118" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Floor glow ring under pedestal */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.35, 48]} />
        <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} />
      </mesh>

      {/* Levitating Kinetic Gyroscopic Core */}
      <group position={[0, 0, 0]}>
        {/* Outer Ring */}
        <group ref={outerRingRef} position={[0, 1.9, 0]}>
          <mesh>
            <torusGeometry args={[1.35, 0.035, 16, 64]} />
            <meshStandardMaterial color="#e9d5ff" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Accent node markers */}
          <mesh position={[1.35, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ec4899" />
          </mesh>
        </group>

        {/* Middle Ring */}
        <group ref={midRingRef} position={[0, 1.9, 0]}>
          <mesh>
            <torusGeometry args={[1.05, 0.03, 16, 64]} />
            <meshStandardMaterial color="#c084fc" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>

        {/* Inner Ring */}
        <group ref={innerRingRef} position={[0, 1.9, 0]}>
          <mesh>
            <torusGeometry args={[0.75, 0.025, 16, 48]} />
            <meshStandardMaterial color="#f472b6" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>

        {/* Floating Glowing Faceted Crystal Core */}
        <mesh ref={crystalRef} position={[0, 1.9, 0]}>
          <dodecahedronGeometry args={[0.42, 0]} />
          <meshPhysicalMaterial
            color="#d8b4fe"
            emissive="#a855f7"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.2}
            transmission={0.65}
            transparent
            opacity={0.85}
            thickness={1.2}
          />
        </mesh>
      </group>

      {/* Museum Digital Art Canvases */}
      {artworks.map((art) => (
        <group
          key={art.id}
          position={art.pos}
          rotation={art.rot}
          onClick={() => onSelectArtwork?.(art.title)}
          onPointerOver={() => setHoveredArt(art.id)}
          onPointerOut={() => setHoveredArt(null)}
        >
          {/* Frame Border */}
          <mesh castShadow>
            <boxGeometry args={[3.2, 2.2, 0.1]} />
            <meshStandardMaterial
              color={hoveredArt === art.id ? "#381e72" : "#1e1b2e"}
              roughness={0.4}
              metalness={0.8}
            />
          </mesh>

          {/* Canvas Display Surface */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.9, 1.9]} />
            <meshStandardMaterial
              color="#090514"
              emissive={art.accent}
              emissiveIntensity={hoveredArt === art.id ? 0.6 : 0.3}
              roughness={0.2}
            />
          </mesh>

          {/* Procedural Abstract Art Geometry inside frame */}
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.1}>
            <mesh position={[0, 0, 0.18]}>
              <octahedronGeometry args={[0.45, 1]} />
              <meshStandardMaterial
                color={art.color}
                wireframe
                emissive={art.color}
                emissiveIntensity={1.0}
              />
            </mesh>
          </Float>

          {/* Canvas Ambient Wall Light */}
          <pointLight position={[0, 0, 0.8]} intensity={hoveredArt === art.id ? 6 : 2.5} color={art.color} distance={3.5} />

          {/* Placard / Title Label */}
          <Html distanceFactor={11} position={[0, -1.35, 0.1]}>
            <div
              className={`transition-all duration-300 pointer-events-none select-none rounded bg-black/90 px-2.5 py-1 text-center font-mono text-[10px] backdrop-blur border ${
                hoveredArt === art.id
                  ? "border-purple-400 text-purple-300 scale-105"
                  : "border-purple-500/20 text-slate-400"
              }`}
            >
              <div className="font-bold tracking-wider">{art.title}</div>
              <div className="text-[9px] opacity-75">{art.artist}</div>
            </div>
          </Html>
        </group>
      ))}

      {/* Floating Kinetic Sculpture Label */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group position={[0, 3.4, 0]}>
          <Html distanceFactor={13} position={[0, 0, 0]} center>
            <div className="pointer-events-none select-none rounded-full bg-purple-950/80 px-3 py-1 font-mono text-[11px] text-purple-300 backdrop-blur border border-purple-500/30 whitespace-nowrap shadow-lg">
              KINETIC CORE // OSCILLATOR 02
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}
