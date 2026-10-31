"use client";

import React from "react";

export function RoomPillars() {
  const portalPositions = [9, 27, 45];

  return (
    <group>
      {portalPositions.map((x, index) => (
        <group key={index} position={[x, 0, 0]}>
          {/* Left Column */}
          <mesh position={[0, 3.5, 4.5]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 7, 1.2]} />
            <meshStandardMaterial color="#0b0f19" roughness={0.7} metalness={0.4} />
          </mesh>
          {/* Vertical light strip on left column */}
          <mesh position={[0.41, 3.5, 4.5]}>
            <boxGeometry args={[0.02, 6.2, 0.1]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>

          {/* Right Column */}
          <mesh position={[0, 3.5, -4.5]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 7, 1.2]} />
            <meshStandardMaterial color="#0b0f19" roughness={0.7} metalness={0.4} />
          </mesh>
          {/* Vertical light strip on right column */}
          <mesh position={[0.41, 3.5, -4.5]}>
            <boxGeometry args={[0.02, 6.2, 0.1]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>

          {/* Overhead Architectural Header Beam */}
          <mesh position={[0, 7.1, 0]}>
            <boxGeometry args={[0.8, 0.6, 10.2]} />
            <meshStandardMaterial color="#060911" roughness={0.8} />
          </mesh>

          {/* Floor Threshold Guide */}
          <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 7.5]} />
            <meshBasicMaterial color="#64748b" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Global Ground Floor Plane with subtle reflectivity */}
      <mesh position={[27, -0.02, 0]} receiveShadow>
        <planeGeometry args={[120, 40]} />
        <meshStandardMaterial
          color="#05070c"
          roughness={0.85}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}
