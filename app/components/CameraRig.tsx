"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { RoomInfo } from "@/app/data/roomsData";

interface CameraRigProps {
  activeRoom: RoomInfo;
  onTransitionStart?: () => void;
  onTransitionComplete?: () => void;
  enableParallax?: boolean;
}

export function CameraRig({
  activeRoom,
  onTransitionStart,
  onTransitionComplete,
  enableParallax = true,
}: CameraRigProps) {
  const { camera } = useThree();
  const isTransitioning = useRef(false);
  const isInitialMount = useRef(true);

  // We maintain a Vector3 for the current lookAt point so GSAP can tween it smoothly
  const currentLookAt = useRef(
    new THREE.Vector3(
      activeRoom.targetPosition[0],
      activeRoom.targetPosition[1],
      activeRoom.targetPosition[2]
    )
  );

  // Desired camera base position (before parallax)
  const baseCamPos = useRef(
    new THREE.Vector3(
      activeRoom.cameraPosition[0],
      activeRoom.cameraPosition[1],
      activeRoom.cameraPosition[2]
    )
  );

  // Target lookAt point
  const baseLookAt = useRef(
    new THREE.Vector3(
      activeRoom.targetPosition[0],
      activeRoom.targetPosition[1],
      activeRoom.targetPosition[2]
    )
  );

  // Handle room changes with GSAP tween
  useEffect(() => {
    const targetCam = activeRoom.cameraPosition;
    const targetLook = activeRoom.targetPosition;

    baseLookAt.current.set(targetLook[0], targetLook[1], targetLook[2]);

    if (isInitialMount.current) {
      // First load: position camera immediately without transition
      camera.position.set(targetCam[0], targetCam[1], targetCam[2]);
      baseCamPos.current.set(targetCam[0], targetCam[1], targetCam[2]);
      currentLookAt.current.set(targetLook[0], targetLook[1], targetLook[2]);
      camera.lookAt(currentLookAt.current);
      isInitialMount.current = false;
      return;
    }

    isTransitioning.current = true;
    onTransitionStart?.();

    // Kill any existing tweens to avoid conflicts
    gsap.killTweensOf(baseCamPos.current);
    gsap.killTweensOf(currentLookAt.current);

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        onTransitionComplete?.();
      },
    });

    // Cinematic curve: slow start, fast glide through corridors, smooth settle
    tl.to(
      baseCamPos.current,
      {
        x: targetCam[0],
        y: targetCam[1],
        z: targetCam[2],
        duration: 1.85,
        ease: "power3.inOut",
      },
      0
    );

    // Simultaneously tween lookAt target
    tl.to(
      currentLookAt.current,
      {
        x: targetLook[0],
        y: targetLook[1],
        z: targetLook[2],
        duration: 1.75,
        ease: "power2.inOut",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [activeRoom, camera, onTransitionStart, onTransitionComplete]);

  // Frame loop: apply subtle mouse parallax and update camera lookAt
  useFrame((state, delta) => {
    const pointer = state.pointer;

    // Apply subtle parallax offset only when enabled and not in high-speed transition
    if (enableParallax && !isTransitioning.current) {
      const parallaxX = pointer.x * 0.35;
      const parallaxY = pointer.y * 0.2;

      // Smoothly interpolate towards baseCamPos + parallax
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        baseCamPos.current.x + parallaxX,
        4,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        baseCamPos.current.y + parallaxY,
        4,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        baseCamPos.current.z,
        4,
        delta
      );
    } else {
      // During active tween, camera follows baseCamPos directly
      camera.position.x = baseCamPos.current.x;
      camera.position.y = baseCamPos.current.y;
      camera.position.z = baseCamPos.current.z;
    }

    // Camera always looks at the smoothly interpolated currentLookAt vector
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
