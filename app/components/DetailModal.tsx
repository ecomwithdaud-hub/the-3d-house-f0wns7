"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, ShieldCheck, Sparkles, Cpu, Layers } from "lucide-react";
import { RoomInfo } from "@/app/data/roomsData";

interface DetailModalProps {
  room: RoomInfo;
  isOpen: boolean;
  onClose: () => void;
  modalType?: "specs" | "contact" | "general";
}

export function DetailModal({
  room,
  isOpen,
  onClose,
  modalType = "general",
}: DetailModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950/95 p-6 shadow-2xl md:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{
              borderColor: room.accentColor,
              backgroundColor: `${room.accentColor}15`,
            }}
          >
            {room.id === "showroom" && <Cpu className="h-5 w-5" style={{ color: room.accentColor }} />}
            {room.id === "gallery" && <Sparkles className="h-5 w-5" style={{ color: room.accentColor }} />}
            {room.id === "vault" && <ShieldCheck className="h-5 w-5" style={{ color: room.accentColor }} />}
            {room.id === "contact" && <Layers className="h-5 w-5" style={{ color: room.accentColor }} />}
          </div>
          <div>
            <div className="text-[11px] font-mono tracking-widest text-slate-400">
              {room.tag}
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {modalType === "contact" ? "Transmission Uplink" : room.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-4">
          {modalType === "contact" || room.id === "contact" ? (
            formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-amber-400 animate-bounce" />
                <h3 className="mt-3 text-lg font-bold text-white">Transmission Dispatched</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Uplink established. You will receive a response within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <p className="text-sm text-slate-300">
                  Initiate direct contact for bespoke 3D development, architectural visualization, or technical leadership.
                </p>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">CALLSIGN / NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">TRANSMISSION FREQUENCY / EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@nexus.studio"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">BRIEF / OBJECTIVE</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="We require an immersive real-time 3D web experience..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 py-2.5 text-sm font-semibold text-slate-950 transition-colors"
                >
                  <Send className="h-4 w-4" /> TRANSMIT DATA
                </button>
              </form>
            )
          ) : (
            <div>
              <p className="text-sm leading-relaxed text-slate-300">
                {room.description}
              </p>

              <div className="mt-5">
                <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Telemetry & Specifications
                </h4>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  {room.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5 font-mono text-xs"
                    >
                      <div className="text-[10px] text-slate-400">{spec.label}</div>
                      <div className="mt-0.5 font-semibold text-slate-200">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Spatial Architecture
                </h4>
                <ul className="mt-2 space-y-1.5 font-mono text-xs text-slate-300">
                  {room.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: room.accentColor }} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
