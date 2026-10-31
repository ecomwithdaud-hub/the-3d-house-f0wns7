"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface ShowroomProps {
  position?: [number, number, number];
  onInspectNode?: (nodeName: string) => void;
}

export function Showroom({ position = [0, 0, 0], onInspectNode }: ShowroomProps) {
  const turntableRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Subtle continuous rotation of the display turntable
  useFrame((_, delta) => {
    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Room Lighting specific to Showroom */}
      <spotLight
        position={[0, 8, 2]}
        intensity={60}
        angle={0.65}
        penumbra={0.8}
        color="#ffffff"
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        position={[4, 6, -3]}
        intensity={35}
        angle={0.6}
        penumbra={0.9}
        color="#38bdf8"
      />
      <spotLight
        position={[-4, 5, -2]}
        intensity={30}
        angle={0.6}
        penumbra={0.9}
        color="#818cf8"
      />
      <pointLight position={[0, 0.2, 0]} intensity={12} color="#38bdf8" distance={5} />

      {/* Architectural Ceiling Light Baffle / Canopy */}
      <group position={[0, 7.5, 0]}>
        <mesh>
          <boxGeometry args={[14, 0.2, 12]} />
          <meshStandardMaterial color="#0b0f17" roughness={0.7} metalness={0.4} />
        </mesh>
        {/* Glowing linear light strips */}
        {[-3, -1, 1, 3].map((z, idx) => (
          <mesh key={idx} position={[0, -0.11, z]}>
            <boxGeometry args={[12, 0.05, 0.25]} />
            <meshBasicMaterial color="#e0f2fe" />
          </mesh>
        ))}
      </group>

      {/* Back Architectural Wall & Accent Pillar Panels */}
      <group position={[0, 3.5, -5.5]}>
        <mesh receiveShadow>
          <boxGeometry args={[16, 7, 0.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.85} metalness={0.2} />
        </mesh>
        {/* Vertical emissive accents */}
        {[-6, -3, 3, 6].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.32]}>
            <boxGeometry args={[0.08, 6.2, 0.05]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}
        {/* Wall Brand Typography / Logo Plate */}
        <mesh position={[0, 2.2, 0.32]}>
          <planeGeometry args={[4.2, 0.9]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.3}
            metalness={0.8}
            emissive="#0369a1"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Turntable Base Platform */}
      <group ref={turntableRef} position={[0, 0, 0]}>
        {/* Outer glowing ring */}
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.1, 4.25, 64]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>

        {/* Outer beveled step */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <cylinderGeometry args={[4.2, 4.4, 0.1, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Center rotating disk */}
        <mesh position={[0, 0.12, 0]} receiveShadow>
          <cylinderGeometry args={[3.95, 3.95, 0.08, 64]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Concentric detail grooves */}
        <mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.53, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>

        {/* Procedural High-Detail Concept Vehicle */}
        <group position={[0, 0.2, 0]}>
          {/* Main Aerodynamic Monocoque Body */}
          <group position={[0, 0.55, 0]}>
            {/* Lower Hull */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <boxGeometry args={[1.9, 0.35, 4.4]} />
              <meshPhysicalMaterial
                color="#0284c7"
                metalness={0.9}
                roughness={0.12}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                reflectivity={0.9}
              />
            </mesh>

            {/* Front Hood Wedge */}
            <mesh castShadow position={[0, 0.08, 1.4]} rotation={[0.15, 0, 0]}>
              <boxGeometry args={[1.82, 0.22, 1.8]} />
              <meshPhysicalMaterial
                color="#0369a1"
                metalness={0.9}
                roughness={0.15}
                clearcoat={1.0}
              />
            </mesh>

            {/* Front Splitter Carbon Fiber */}
            <mesh castShadow position={[0, -0.15, 2.3]}>
              <boxGeometry args={[2.05, 0.06, 0.4]} />
              <meshStandardMaterial color="#09090b" roughness={0.6} metalness={0.8} />
            </mesh>

            {/* Glass Cockpit Canopy */}
            <mesh position={[0, 0.35, -0.2]} rotation={[-0.1, 0, 0]}>
              <boxGeometry args={[1.35, 0.42, 2.1]} />
              <meshPhysicalMaterial
                color="#0f172a"
                transmission={0.8}
                transparent
                opacity={0.7}
                roughness={0.05}
                metalness={0.1}
                ior={1.5}
              />
            </mesh>

            {/* Roof Spine & Air Intake Scoop */}
            <mesh position={[0, 0.58, -0.5]}>
              <boxGeometry args={[0.3, 0.12, 1.4]} />
              <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.9} />
            </mesh>

            {/* Sleek Rear Diffuser */}
            <mesh position={[0, -0.12, -2.25]}>
              <boxGeometry args={[1.95, 0.14, 0.45]} />
              <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.8} />
            </mesh>

            {/* Rear Aerodynamic Wing / Spoiler */}
            <group position={[0, 0.65, -2.0]}>
              {/* Twin Wing Struts */}
              <mesh position={[-0.6, -0.2, 0]}>
                <boxGeometry args={[0.06, 0.4, 0.15]} />
                <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.8} />
              </mesh>
              <mesh position={[0.6, -0.2, 0]}>
                <boxGeometry args={[0.06, 0.4, 0.15]} />
                <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Carbon Airfoil Wing */}
              <mesh castShadow position={[0, 0.02, 0]} rotation={[0.08, 0, 0]}>
                <boxGeometry args={[2.15, 0.05, 0.5]} />
                <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.9} />
              </mesh>
            </group>

            {/* LED Blade Headlights */}
            <mesh position={[-0.7, 0.08, 2.22]} rotation={[0, -0.1, 0]}>
              <boxGeometry args={[0.42, 0.05, 0.1]} />
              <meshBasicMaterial color="#e0f2fe" />
            </mesh>
            <mesh position={[0.7, 0.08, 2.22]} rotation={[0, 0.1, 0]}>
              <boxGeometry args={[0.42, 0.05, 0.1]} />
              <meshBasicMaterial color="#e0f2fe" />
            </mesh>

            {/* Continuous Cyberpunk Rear Light Bar */}
            <mesh position={[0, 0.15, -2.23]}>
              <boxGeometry args={[1.8, 0.06, 0.08]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>

          {/* 4 Wheels & Performance Carbon Ceramic Brakes */}
          {[
            { x: -1.02, y: 0.38, z: 1.35, isLeft: true },
            { x: 1.02, y: 0.38, z: 1.35, isLeft: false },
            { x: -1.04, y: 0.4, z: -1.35, isLeft: true },
            { x: 1.04, y: 0.4, z: -1.35, isLeft: false },
          ].map((w, idx) => (
            <group
              key={idx}
              position={[w.x, w.y, w.z]}
              ref={(el) => {
                if (el) wheelsRef.current[idx] = el;
              }}
            >
              {/* Tire Rubber */}
              <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.38, 0.38, 0.28, 32]} />
                <meshStandardMaterial color="#18181b" roughness={0.88} metalness={0.1} />
              </mesh>
              {/* Alloy Rim */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.26, 0.26, 0.29, 16]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Brembo Brake Caliper */}
              <mesh position={[0, 0.14, 0]}>
                <boxGeometry args={[0.12, 0.12, 0.18]} />
                <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Floating 3D Interactive Hotspot Markers */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[1.8, 2.2, 1.2]}>
          <mesh
            onClick={() => onInspectNode?.("aerodynamics")}
            onPointerOver={() => setHoveredNode("aero")}
            onPointerOut={() => setHoveredNode(null)}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={hoveredNode === "aero" ? "#38bdf8" : "#94a3b8"}
              emissive="#38bdf8"
              emissiveIntensity={hoveredNode === "aero" ? 1.5 : 0.4}
            />
          </mesh>
          <Html distanceFactor={12} position={[0.2, 0.2, 0]}>
            <div className="pointer-events-none select-none rounded-md bg-slate-950/85 px-2.5 py-1 font-mono text-[11px] text-sky-400 backdrop-blur border border-sky-500/30 whitespace-nowrap shadow-lg">
              [ACTIVE AERO DIFFUSER]
            </div>
          </Html>
        </group>
      </Float>

      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[-1.7, 2.0, -1.2]}>
          <mesh
            onClick={() => onInspectNode?.("powertrain")}
            onPointerOver={() => setHoveredNode("power")}
            onPointerOut={() => setHoveredNode(null)}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={hoveredNode === "power" ? "#38bdf8" : "#94a3b8"}
              emissive="#38bdf8"
              emissiveIntensity={hoveredNode === "power" ? 1.5 : 0.4}
            />
          </mesh>
          <Html distanceFactor={12} position={[-0.2, 0.2, 0]}>
            <div className="pointer-events-none select-none rounded-md bg-slate-950/85 px-2.5 py-1 font-mono text-[11px] text-sky-400 backdrop-blur border border-sky-500/30 whitespace-nowrap shadow-lg">
              [1,180 HP DUAL MOTOR]
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}
