"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { RoomInfo } from "@/app/data/roomsData";
import { CameraRig } from "./CameraRig";
import { Showroom } from "./rooms/Showroom";
import { Gallery } from "./rooms/Gallery";
import { Vault } from "./rooms/Vault";
import { Observatory } from "./rooms/Observatory";
import { RoomPillars } from "./rooms/RoomPillars";

interface ExperienceProps {
  activeRoom: RoomInfo;
  onTransitionStart?: () => void;
  onTransitionComplete?: () => void;
  enableParallax?: boolean;
  onInteractiveEvent?: (type: string, payload?: string) => void;
}

export function Experience({
  activeRoom,
  onTransitionStart,
  onTransitionComplete,
  enableParallax = true,
  onInteractiveEvent,
}: ExperienceProps) {
  return (
    <div className="relative h-full w-full select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 3.2, 9.5],
          fov: 46,
          near: 0.1,
          far: 160,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="h-full w-full bg-[#030712]"
      >
        {/* Background & Atmospheric Depth Fog */}
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 14, 55]} />

        {/* Global Ambient Fill Light */}
        <ambientLight intensity={0.4} color="#94a3b8" />

        {/* Global Soft Directional Key Fill */}
        <directionalLight
          position={[10, 15, 10]}
          intensity={0.3}
          color="#e2e8f0"
        />

        <Suspense fallback={null}>
          {/* GSAP Camera Controller with Mouse Parallax */}
          <CameraRig
            activeRoom={activeRoom}
            onTransitionStart={onTransitionStart}
            onTransitionComplete={onTransitionComplete}
            enableParallax={enableParallax}
          />

          {/* Architectural Portals & Continuous Ground Base */}
          <RoomPillars />

          {/* Zone 01: The Showroom (x = 0) */}
          <Showroom
            position={[0, 0, 0]}
            onInspectNode={(node) => onInteractiveEvent?.("inspect", node)}
          />

          {/* Zone 02: The Gallery (x = 18) */}
          <Gallery
            position={[18, 0, 0]}
            onSelectArtwork={(art) => onInteractiveEvent?.("artwork", art)}
          />

          {/* Zone 03: The Vault (x = 36) */}
          <Vault
            position={[36, 0, 0]}
            onAccessVault={() => onInteractiveEvent?.("vault-toggle")}
          />

          {/* Zone 04: The Observatory / Contact Hub (x = 54) */}
          <Observatory
            position={[54, 0, 0]}
            onContactClick={() => onInteractiveEvent?.("contact-open")}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
