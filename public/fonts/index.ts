// fonts/index.ts (or wherever your font file is)
import localFont from "next/font/local";
import { Turret_Road } from "next/font/google";

export const turretRoad = Turret_Road({
  weight: ["200", "300", "400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  variable: "--font-turret-road",
});

// Fixed Fonarto font configuration
export const Fonarto = localFont({
  src: [
    {
      path: "./Rasputin.otf",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: "./NeueMetana-Bold.otf",
    //   weight: "700",
    //   style: "bold",
    // },
  ],
  display: "swap",
  fallback: ["Garamond", "Times New Roman", "serif"],
  variable: "--font-fonarto", // Fixed variable name to match font name
});

// Alternative simpler approach if you only have one font file:
export const FonartoAlt = localFont({
  src: "./Rasputin.otf",
  display: "swap",
  fallback: ["Garamond", "Times New Roman", "serif"],
  variable: "--font-fonarto",
  weight: "100 900", // Allow all weights
});