"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function EnvisionLanding() {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      console.log("Prompt submitted:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted text-foreground">
      {/* Header */}
      <header className=" backdrop-blur-md bg-background/60 sticky top-0 z-10">
        <div className="max-w-screen mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Envision</h1>
          <Button variant="outline" className="text-sm font-medium">
            Log Out
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 max-w-3xl"
        >
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Turn your <span className="text-primary">ideas</span> into{" "}
            <span className="text-primary">videos</span>,instantly.
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe your vision in a few words and let Envision's AI generate a cinematic video from your imagination.
          </p>

          {/* Prompt Input */}
          <div className="flex w-full max-w-xl mx-auto mt-8 bg-white/80 dark:bg-card border border-border rounded-md shadow-md overflow-hidden">
            <Input
              type="text"
              placeholder="e.g. A cat exploring Mars in a spacesuit..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-5 py-5 text-base bg-transparent border-none focus:ring-0 focus:outline-none"
            />
            <Button
              onClick={handleSubmit}
              className="rounded-none rounded-r-md px-5 py-5 bg-primary hover:bg-primary/90 text-white shadow-none"
            >
              <ArrowRight className="h-5 w-5 text-primary-foreground" />
            </Button>
          </div>

          {/* Subtext */}
          <p className="text-sm text-muted-foreground">
            Try a creative prompt — "A robot painter in Tokyo at sunrise."
          </p>
        </motion.div>
      </main>
    </div>
  );
}
