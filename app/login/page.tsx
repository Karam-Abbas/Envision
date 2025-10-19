"use client";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { useState } from "react";
import SignupForm from "@/components/SignupForm";
import { motion } from "framer-motion";
export default function LoginPage() {
  const [createAccountSwitch, setCreateAccountSwitch] =
    useState<boolean>(false);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Login Form */}
      <div className="flex-1 flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <motion.div
              key={createAccountSwitch ? "login" : "signup"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {createAccountSwitch ? (
                <SignupForm setCreateAccountSwitch={setCreateAccountSwitch} />
              ) : (
                <LoginForm setCreateAccountSwitch={setCreateAccountSwitch} />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Branding Panel */}
      <div className="hidden md:flex md:w-1/2 bg-white flex-col justify-center items-center px-10 text-foreground relative border-l border-border">
        <div className="flex flex-col items-center justify-center text-center animate-fadeIn">
          <Image
            src="/login.svg"
            alt="AI Video Creation"
            width={500}
            height={500}
            className="w-3/4 max-w-md mb-6"
            priority
          />
          <h2 className="text-3xl font-semibold tracking-tight mb-2 text-black/80">
            Envision
          </h2>
          <p className="text-base text-muted-foreground max-w-md">
            Turn ideas into cinematic reality with Envision’s AI powered video
            creator.
          </p>
        </div>
        <div className="absolute bottom-6 text-xs text-muted-foreground text-center w-full">
          © 2025 Envision Inc. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
