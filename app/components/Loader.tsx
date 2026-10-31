"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

interface LoaderProps {
  onLoaded?: () => void;
}

export function Loader({ onLoaded }: LoaderProps) {
  const { progress, active } = useProgress();
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Smooth progress number increment
    const target = Math.round(progress);
    const interval = setInterval(() => {
      setDisplayedProgress((prev) => {
        if (prev < target) return prev + 1;
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if ((displayedProgress >= 100 || !active) && !isFadingOut && !isComplete) {
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsComplete(true);
          onLoaded?.();
        }, 800);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [displayedProgress, active, isFadingOut, isComplete, onLoaded]);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-700 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none" />

      {/* Main Loader Box */}
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center z-10">
        {/* Animated Brand Emblem */}
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-xl border border-sky-500/30 animate-spin [animation-duration:8s]" />
          <div className="absolute inset-2 rounded-lg border border-purple-500/40 animate-ping [animation-duration:3s]" />
          <div className="h-4 w-4 rounded-sm bg-gradient-to-tr from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/50" />
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold tracking-[0.25em] text-white font-mono">
          THE 3D HOUSE
        </h1>
        <p className="mt-1 text-xs tracking-wider text-slate-400 font-mono">
          VIRTUAL ARCHITECTURAL SHOWCASE
        </p>

        {/* Progress Bar Container */}
        <div className="mt-8 w-64">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span>SPATIAL ASSETS</span>
            <span className="text-sky-400 font-bold">{displayedProgress}%</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              style={{ width: `${displayedProgress}%` }}
            />
          </div>
        </div>

        {/* Subtitle / Status */}
        <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>CALIBRATING WEBGL SHADER PIPELINES...</span>
        </div>
      </div>
    </div>
  );
}
