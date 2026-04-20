import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ============================================
      // PRIMITIVE TOKENS (Level 1) — COLORS
      // ============================================
      colors: {
        // Neutral palette (grayscale)
        neutral: {
          0: "#FFFFFF",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#050507",
        },

        // Emerald (primary accent — bирюза неон)
        emerald: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2BE0CC",
          500: "#00E5D1", // PRIMARY ACCENT
          600: "#14B8A6",
          700: "#0D9488",
          800: "#0F766E",
          900: "#134E4A",
          950: "#0A3432",
        },

        // Violet (secondary accent)
        violet: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
        },

        // Blue (data visualization, secondary)
        blue: {
          50: "#EFF6FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          950: "#051E3E",
        },

        // Red (error, destructive)
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
        },

        // Green (success)
        green: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#145231",
          950: "#051C15",
        },

        // Amber (warning)
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },

        background: "var(--color-bg-primary)",
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-elevated": "var(--color-bg-elevated)",
        "bg-overlay": "var(--color-bg-overlay)",
        "bg-glass": "var(--color-bg-glass)",
        text: "var(--color-text-primary)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",

        // Legacy colors (for backward compatibility)
        graphite: "#0A111F",
        slateDeep: "#0F1B2E",
        electric: "#4DA6FF",
        emeraldSoft: "#3DD4A1",
        cloud: "#EAF3FF",
      },

      // ============================================
      // TYPOGRAPHY SCALE
      // ============================================
      fontSize: {
        // Display sizes (сверхкрупные)
        "display-xl": ["96px", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "display-lg": ["72px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-md": ["56px", { lineHeight: "1.25", letterSpacing: "-0.015em" }],

        // Heading sizes
        "h1": ["72px", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" }],
        "h2": ["56px", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" }],
        "h3": ["44px", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h4": ["32px", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "600" }],
        "h5": ["24px", { lineHeight: "1.4", fontWeight: "600" }],

        // Body sizes
        "body-xl": ["20px", { lineHeight: "1.5", letterSpacing: "0.005em" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0em" }],
        "body-md": ["16px", { lineHeight: "1.5", letterSpacing: "0em" }],
        "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0.005em" }],

        // Caption / micro
        "caption": ["12px", { lineHeight: "1.5", letterSpacing: "0.03em" }],
        "overline": ["11px", { lineHeight: "1.4", letterSpacing: "0.08em" }],

        // Monospace (цифры, код)
        "mono-xl": ["20px", { lineHeight: "1.4", letterSpacing: "0.025em" }],
        "mono-lg": ["16px", { lineHeight: "1.5", letterSpacing: "0.025em" }],
        "mono-md": ["14px", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },

      // ============================================
      // SPACING SCALE (8-point system)
      // ============================================
      spacing: {
        0: "0",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        none: "0",
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
      },

      // ============================================
      // BOX SHADOWS (elevation system)
      // ============================================
      boxShadow: {
        // Elevations
        "elevation-1": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "elevation-2": "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 13px rgba(0, 0, 0, 0.05)",
        "elevation-3": "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        "elevation-4": "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
        "elevation-5": "0 25px 50px rgba(0, 0, 0, 0.15)",

        // Neon glows (3 levels)
        "glow-emerald-subtle": "0 0 12px rgba(0, 229, 209, 0.35)",
        "glow-emerald-medium": "0 0 20px rgba(0, 229, 209, 0.5), 0 0 40px rgba(0, 229, 209, 0.25)",
        "glow-emerald-strong": "0 0 30px rgba(0, 229, 209, 0.6), 0 0 60px rgba(0, 229, 209, 0.3)",

        // Violet secondary glow
        "glow-violet-subtle": "0 0 12px rgba(139, 92, 246, 0.35)",
        "glow-violet-medium": "0 0 20px rgba(139, 92, 246, 0.5)",

        // Legacy
        panel: "0 24px 80px rgba(7, 17, 32, 0.35)",
        glow: "0 0 60px rgba(77, 166, 255, 0.25)",

        none: "none",
      },

      // ============================================
      // BLUR VALUES
      // ============================================
      backdropBlur: {
        xs: "4px",
        sm: "16px",
        md: "24px",
        lg: "40px",
        xl: "60px",
      },

      // ============================================
      // TRANSITION TIMING & DURATION
      // ============================================
      transitionDuration: {
        fast: "200ms",
        normal: "300ms",
        slow: "500ms",
        slower: "700ms",
      },

      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "in-out-expo": "cubic-bezier(1, 0, 0, 1)",
      },

      // ============================================
      // FONT FAMILY
      // ============================================
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      // ============================================
      // BACKGROUND IMAGES
      // ============================================
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "grid-subtle": "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
      },

      // ============================================
      // Z-INDEX SCALE
      // ============================================
      zIndex: {
        hide: "-1",
        auto: "auto",
        0: "0",
        base: "1",
        elevated: "10",
        overlay: "20",
        dropdown: "25",
        sticky: "30",
        modal: "40",
        toast: "50",
        tooltip: "60",
      },

      // ============================================
      // CONTAINER QUERIES (optional)
      // ============================================
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },

      // ============================================
      // BORDER COLORS (for @apply border-border)
      // ============================================
      borderColor: {
        DEFAULT: "var(--color-border-default, #1F2937)",
        border: "var(--color-border-default, #1F2937)",
        strong: "var(--color-border-strong, #374151)",
        accent: "var(--color-border-accent, #00E5D1)",
      },
    },
  },

  plugins: [],
};

export default config;
