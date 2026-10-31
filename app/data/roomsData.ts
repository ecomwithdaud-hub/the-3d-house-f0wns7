export interface RoomInfo {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tag: string;
  accentColor: string;
  theme: {
    primary: string;
    glow: string;
    border: string;
    badgeBg: string;
    textAccent: string;
  };
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  actionLabel: string;
}

export const ROOMS_DATA: RoomInfo[] = [
  {
    id: "showroom",
    index: "01",
    tag: "SPACE 01 // ATELIER",
    title: "The Showroom",
    subtitle: "AERODYNAMICS & SCULPTURE",
    accentColor: "#38bdf8", // Sky blue
    theme: {
      primary: "from-sky-500/20 to-blue-600/10",
      glow: "rgba(56, 189, 248, 0.4)",
      border: "border-sky-500/30",
      badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      textAccent: "text-sky-400",
    },
    cameraPosition: [0, 3.2, 9.5],
    targetPosition: [0, 1.2, 0],
    description:
      "A minimalist architectural pavilion dedicated to industrial aesthetics and mechanical precision. Showcasing an aerodynamic concept vehicle resting upon a synchronous rotating display pedestal with ambient edge lighting.",
    features: [
      "Procedural Concept Hypercar Chassis",
      "Dynamic Synchronous Turn-Table",
      "Volumetric Studio Key & Rim Lights",
      "Interactive Spec Inspection Nodes",
    ],
    specs: [
      { label: "POWERTRAIN", value: "Quad-Motor Dual-Inverter" },
      { label: "PEAK OUTPUT", value: "1,180 HP // 1,420 Nm" },
      { label: "0-100 KM/H", value: "1.95 Seconds" },
      { label: "CHASSIS", value: "Monocoque Carbon Weave" },
    ],
    actionLabel: "INSPECT CHASSIS",
  },
  {
    id: "gallery",
    index: "02",
    tag: "SPACE 02 // SANCTUARY",
    title: "The Gallery",
    subtitle: "KINETIC ART & LUMINESCENCE",
    accentColor: "#a855f7", // Purple
    theme: {
      primary: "from-purple-500/20 to-fuchsia-600/10",
      glow: "rgba(168, 85, 247, 0.4)",
      border: "border-purple-500/30",
      badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      textAccent: "text-purple-400",
    },
    cameraPosition: [18, 3.4, 9.2],
    targetPosition: [18, 1.5, 0],
    description:
      "A low-lux contemporary exhibition space exploring kinetic geometry and generative art. A multi-axis gyroscopic crystal core floats suspended at its center, surrounded by illuminated digital canvases with ambient glow.",
    features: [
      "Multi-Axis Gyroscopic Kinetic Sculpture",
      "Floating Illuminated Digital Canvases",
      "Volumetric Spotlight Cones",
      "Procedural Gradient Shader Artwork",
    ],
    specs: [
      { label: "EXHIBITION", value: "Generative Horizons" },
      { label: "CURATOR", value: "Studio Monoform" },
      { label: "MEDIUM", value: "Photons & WebGL Shaders" },
      { label: "EDITION", value: "1 of 1 Verified Artifacts" },
    ],
    actionLabel: "CURATOR NOTES",
  },
  {
    id: "vault",
    index: "03",
    tag: "SPACE 03 // ARCHIVE",
    title: "The Vault",
    subtitle: "CRYPTOGRAPHIC SANCTUM",
    accentColor: "#10b981", // Emerald
    theme: {
      primary: "from-emerald-500/20 to-teal-600/10",
      glow: "rgba(16, 185, 129, 0.4)",
      border: "border-emerald-500/30",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      textAccent: "text-emerald-400",
    },
    cameraPosition: [36, 3.6, 9.0],
    targetPosition: [36, 1.4, 0],
    description:
      "A high-security cybernetic chamber crafted from brushed titanium and dark chrome. Laser security arrays guard a floating magnetic containment ring that safeguards the central cryptographic quantum key.",
    features: [
      "Reinforced Titanium Blast Door Frame",
      "Pulsing Infrared & Cyan Laser Grids",
      "Magnetic Levitation Containment Rings",
      "Industrial Hazard Floor Graphics",
    ],
    specs: [
      { label: "ENCRYPTION", value: "Post-Quantum 4096-bit" },
      { label: "INTEGRITY", value: "100% Vault Sealed" },
      { label: "ATMOSPHERE", value: "Inert Argon 99.8%" },
      { label: "ACCESS CLEARANCE", value: "Bio-Metric Tier Alpha" },
    ],
    actionLabel: "DECRYPT ARCHIVE",
  },
  {
    id: "contact",
    index: "04",
    tag: "SPACE 04 // HORIZON",
    title: "The Observatory",
    subtitle: "COMMUNICATION & BEYOND",
    accentColor: "#f59e0b", // Amber
    theme: {
      primary: "from-amber-500/20 to-orange-600/10",
      glow: "rgba(245, 158, 11, 0.4)",
      border: "border-amber-500/30",
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      textAccent: "text-amber-400",
    },
    cameraPosition: [54, 3.0, 9.2],
    targetPosition: [54, 1.3, 0],
    description:
      "A panoramic starlight lounge overlooking a digital cosmos. A holographic planetary communication terminal allows visitors to establish contact, download design archives, or initiate custom project collaborations.",
    features: [
      "Holographic Celestial Terminal Table",
      "Interactive Direct Transmission Portal",
      "Panoramic Glass Framing & Starfield",
      "Live Network Uplink Interface",
    ],
    specs: [
      { label: "NETWORK UPLINK", value: "Active 10 Gbps Direct" },
      { label: "STATUS", value: "Available for Commissions" },
      { label: "LOCATION", value: "Virtual Orbit Station 04" },
      { label: "RESPONSE TIME", value: "< 24 Hours Standard" },
    ],
    actionLabel: "INITIATE TRANSMISSION",
  },
];
