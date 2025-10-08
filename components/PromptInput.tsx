"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEnvisionContext } from "@/contexts";

const PromptInput = ({
  mainPrompt,
  setMainPrompt,
  handleKeyPress,
  handleSubmit,
}: {
  mainPrompt: string;
  setMainPrompt: (value: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}) => {
  const { isLoading } = useEnvisionContext();
  return (
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
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 focus:outline-none"
            />
            <Button
              onClick={handleSubmit}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 text-white transition-all duration-200"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
            </Button>
          </div>
        </motion.div>

        {/* Subtext */}
        <p className="text-sm text-muted-foreground italic">
          Try something creative — “A robot painter in Tokyo at sunrise.”
        </p>
      </motion.div>
    </main>
  );
};

export default PromptInput;
