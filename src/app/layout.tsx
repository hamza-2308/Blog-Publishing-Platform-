import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Quire — writing worth reviewing",
    template: "%s | Quire"
  },
  description: "A publishing desk where every submission is reviewed before it reaches readers."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}