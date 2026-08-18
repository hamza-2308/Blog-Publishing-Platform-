import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F4F3EF",
          100: "#E7E5DD",
          200: "#D4D2C8",
          300: "#B5B3A8",
          400: "#6B6A63",
          500: "#4A4943",
          700: "#2C2B26",
          900: "#171712"
        },
        accent: {
          50: "#E6F1FB",
          100: "#B5D4F4",
          200: "#8ABCE9",
          300: "#5FA3DE",
          400: "#378ADD",
          500: "#2472C6",
          600: "#185FA5",
          700: "#14508C",
          800: "#0C447C"
        },
        cream: {
          50: "#FDFCF9",
          100: "#FAF8F2",
          200: "#F5F2E8"
        }
      },
      fontFamily: {
        voice: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 2px 8px rgba(23, 23, 18, 0.04)",
        card: "0 4px 16px rgba(23, 23, 18, 0.06)",
        lift: "0 12px 32px rgba(23, 23, 18, 0.10)",
        glow: "0 0 24px rgba(55, 138, 221, 0.15)"
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "fade-in-up": "fadeInUp 0.5s ease-out both",
        "fade-in-down": "fadeInDown 0.5s ease-out both",
        "scale-in": "scaleIn 0.3s ease-out both",
        "slide-in-right": "slideInRight 0.4s ease-out both",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  plugins: []
};

export default config;