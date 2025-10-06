"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut } from "lucide-react";

export default function EnvisionLanding() {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      console.log("Prompt submitted:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/50 to-background text-foreground overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 w-[700px] h-[700px] bg-primary/10 blur-3xl rounded-full -translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <header className="backdrop-blur-md bg-background/60 sticky top-0 z-10 border-b border-border">
        <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Envision
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 space-y-8 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Transform your <span className="text-primary">ideas</span> into{" "}
            <span className="text-primary">cinematic videos</span>
          </h2>

          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Envision turns your imagination into motion with AI-generated
            storytelling.
          </p>

          {/* Prompt Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-full max-w-2xl mx-auto mt-10"
          >
            <div className="flex items-center gap-2 py-2 pl-4 pr-2 rounded-full bg-gray-500/10">
              <input
                type="text"
                placeholder="Enter your vision..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 focus:outline-none"
              />
              <Button
                onClick={handleSubmit}
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 text-white transition-all duration-200"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Subtext */}
          <p className="text-sm text-muted-foreground italic">
            Try something creative — “A robot painter in Tokyo at sunrise.”
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-6">
        Envision Inc. © 2025 — Powered by imagination.
      </footer>
    </div>
  );
}
