"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEnvisionContext } from "@/contexts";
import PromptInput from "@/components/PromptInput";

export default function PromptPage() {
  const router = useRouter();
  const { mainPrompt, setMainPrompt, setIsLoading } = useEnvisionContext();

  const handleSubmit = async () => {
    if (mainPrompt.trim()) {
      try {
        setIsLoading(true);
        // generate project and get project id
        // const response = await axiosInstance.post("/api/prompt", {
        //   mainPrompt,
        // });
        // Simulate API call with a Promise and setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate 2s API call
        setIsLoading(false);
        router.push("/auth/characters");
      } catch (error) {
        toast.error("Error submitting prompt");
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <PromptInput
      mainPrompt={mainPrompt}
      setMainPrompt={setMainPrompt}
      handleKeyPress={handleKeyPress}
      handleSubmit={handleSubmit}
    />
  );
}
