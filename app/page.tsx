"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Eye,
  Info,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ROOMS_DATA } from "@/app/data/roomsData";
import { Loader } from "@/app/components/Loader";
import { DetailModal } from "@/app/components/DetailModal";
import { soundFX } from "@/app/utils/audio";

// Dynamically import Experience component to prevent SSR hydration errors
const Experience = dynamic(
  () => import("@/app/components/Experience").then((mod) => mod.Experience),
  { ssr: false }
);

export default function Home() {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [enableParallax, setEnableParallax] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"general" | "contact" | "specs">("general");
  const [infoFade, setInfoFade] = useState(true);

  const activeRoom = ROOMS_DATA[activeRoomIndex];

  // Room navigation function
  const goToRoom = useCallback(
    (index: number) => {
      if (index === activeRoomIndex || isTransitioning) return;
      if (index < 0 || index >= ROOMS_DATA.length) return;

      soundFX.playTransitionGlide();
      setInfoFade(false);

      setTimeout(() => {
        setActiveRoomIndex(index);
        setInfoFade(true);
      }, 350);
    },
    [activeRoomIndex, isTransitioning]
  );

  const nextRoom = useCallback(() => {
    const nextIdx = (activeRoomIndex + 1) % ROOMS_DATA.length;
    goToRoom(nextIdx);
  }, [activeRoomIndex, goToRoom]);

  const prevRoom = useCallback(() => {
    const prevIdx = (activeRoomIndex - 1 + ROOMS_DATA.length) % ROOMS_DATA.length;
    goToRoom(prevIdx);
  }, [activeRoomIndex, goToRoom]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      if (e.key === "ArrowRight") {
        nextRoom();
      } else if (e.key === "ArrowLeft") {
        prevRoom();
      } else if (["1", "2", "3", "4"].includes(e.key)) {
        goToRoom(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToRoom, nextRoom, prevRoom, isModalOpen]);

  const handleAudioToggle = () => {
    const muted = soundFX.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleInteractiveEvent = (type: string) => {
    soundFX.playClick();
    if (type === "contact-open") {
      setModalType("contact");
      setIsModalOpen(true);
    } else if (type === "inspect" || type === "vault-toggle" || type === "artwork") {
      setModalType("specs");
      setIsModalOpen(true);
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#030712] font-sans text-slate-100 antialiased select-none">
      {/* 3D Asset Preloader */}
      <Loader />

      {/* 3D WebGL Canvas Viewport */}
      <div className="absolute inset-0 z-0">
        <Experience
          activeRoom={activeRoom}
          onTransitionStart={() => setIsTransitioning(true)}
          onTransitionComplete={() => setIsTransitioning(false)}
          enableParallax={enableParallax}
          onInteractiveEvent={handleInteractiveEvent}
        />
      </div>

      {/* Vignette & Cinematic Ambient Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(3,7,18,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80" />

      {/* TOP HEADER */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 md:px-10 md:py-6 backdrop-blur-sm bg-slate-950/20 border-b border-white/5">
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-md">
            <span className="font-mono text-xs font-bold text-sky-400">3D</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-[0.2em] text-white">
                THE 3D HOUSE
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-500/20">
                <span className="mr-1 h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                WEBGL 2.0
              </span>
            </div>
            <div className="text-[10px] tracking-wider text-slate-400 font-mono">
              VIRTUAL ARCHITECTURAL ATELIER
            </div>
          </div>
        </div>

        {/* Room Navigation Tabs */}
        <nav className="flex items-center gap-1.5 md:gap-2">
          {ROOMS_DATA.map((room, idx) => {
            const isActive = idx === activeRoomIndex;
            return (
              <button
                key={room.id}
                onClick={() => {
                  soundFX.playClick();
                  goToRoom(idx);
                }}
                disabled={isTransitioning}
                className={`relative px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)] border border-white/20 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                } ${isTransitioning ? "cursor-wait opacity-80" : "cursor-pointer"}`}
              >
                <span className="text-[10px] opacity-60">0{idx + 1}</span>
                <span className="hidden sm:inline">{room.title.replace("The ", "")}</span>
                <span className="sm:hidden">{room.title.replace("The ", "").slice(0, 4)}</span>

                {isActive && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                    style={{ backgroundColor: room.accentColor }}
                  />
                )}
              </button>
            );
          })}

          {/* Audio & Parallax Toggle Controls */}
          <div className="ml-2 hidden md:flex items-center gap-1 pl-2 border-l border-white/10">
            <button
              onClick={handleAudioToggle}
              title={isAudioMuted ? "Enable Audio" : "Mute Audio"}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                !isAudioMuted
                  ? "border-sky-500/40 bg-sky-500/10 text-sky-400"
                  : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setEnableParallax((prev) => !prev)}
              title={enableParallax ? "Parallax Active" : "Parallax Disabled"}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                enableParallax
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-slate-500 hover:text-slate-300"
              }`}
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* DYNAMIC FOOTER / INFO BOX (BOTTOM-LEFT) */}
      <section className="fixed bottom-6 left-6 z-30 max-w-sm md:max-w-md select-text">
        <div
          className={`group rounded-2xl border border-white/10 bg-slate-950/75 p-5 md:p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
            infoFade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* Room Tag & Accent Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full animate-ping"
                style={{ backgroundColor: activeRoom.accentColor }}
              />
              <span className="font-mono text-xs tracking-widest text-slate-400">
                {activeRoom.tag}
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              COORD [{activeRoom.cameraPosition[0]}.00, {activeRoom.cameraPosition[1]}.00]
            </span>
          </div>

          {/* Room Title */}
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {activeRoom.title}
          </h2>
          <div
            className="text-xs font-mono tracking-wider"
            style={{ color: activeRoom.accentColor }}
          >
            {activeRoom.subtitle}
          </div>

          {/* Room Atmospheric Description */}
          <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-slate-300/90">
            {activeRoom.description}
          </p>

          {/* Quick Specifications Strip */}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
            {activeRoom.specs.slice(0, 2).map((item, idx) => (
              <div key={idx} className="font-mono text-[11px]">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400">
                  {item.label}
                </span>
                <span className="font-medium text-slate-200">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Interactive Action CTA */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                setModalType(activeRoom.id === "contact" ? "contact" : "specs");
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono font-semibold transition-all duration-300"
              style={{
                backgroundColor: activeRoom.accentColor,
                color: "#030712",
              }}
            >
              <span>{activeRoom.actionLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                setModalType("general");
                setIsModalOpen(true);
              }}
              className="rounded-lg border border-white/15 bg-white/5 p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Overview"
            >
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* BOTTOM-RIGHT NAVIGATION PAGER & SHORTCUTS */}
      <aside className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/75 p-1.5 backdrop-blur-xl">
          <button
            onClick={() => {
              soundFX.playClick();
              prevRoom();
            }}
            disabled={isTransitioning}
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-40 transition-colors"
            title="Previous Space (Left Arrow)"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="px-3 font-mono text-xs font-semibold text-slate-200">
            <span style={{ color: activeRoom.accentColor }}>
              {activeRoom.index}
            </span>{" "}
            <span className="text-slate-600">/</span> 0{ROOMS_DATA.length}
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              nextRoom();
            }}
            disabled={isTransitioning}
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-40 transition-colors"
            title="Next Space (Right Arrow)"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Keyboard Hint Overlay */}
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-white/5 bg-slate-950/40 px-3 py-1 text-[10px] font-mono text-slate-400 backdrop-blur-md">
          <span className="rounded bg-white/10 px-1 py-0.5 text-slate-300">←</span>
          <span className="rounded bg-white/10 px-1 py-0.5 text-slate-300">→</span>
          <span>OR [1-4] TO NAVIGATE SPACES</span>
        </div>
      </aside>

      {/* Floating Status Indicator on Center Bottom during Cinematic Warp */}
      {isTransitioning && (
        <div className="pointer-events-none fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-950/90 px-4 py-1.5 font-mono text-xs text-sky-400 backdrop-blur-lg shadow-xl animate-pulse">
          <Sparkles className="h-3.5 w-3.5 animate-spin" />
          <span>WARPING SPATIAL COORDINATES...</span>
        </div>
      )}

      {/* Detailed Modal Window */}
      <DetailModal
        room={activeRoom}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType={modalType}
      />
    </main>
  );
}
