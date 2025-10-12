"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Character } from "@/types/chracterTypes";
import { ScriptResponse } from "@/types/scriptTypes";

interface EnvisionContextType {
  // Main prompt state
  mainPrompt: string;
  setMainPrompt: (value: string) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Character selection state
  selectedCharacters: Character[];
  setSelectedCharacters: (
    characters: Character[] | ((prev: Character[]) => Character[])
  ) => void;
  scenes: number;
  setScenes: (scenes: number) => void;

  // Script generation state
  script: ScriptResponse | null;
  setScript: (script: ScriptResponse | null) => void;
}

const EnvisionContext = createContext<EnvisionContextType | undefined>(
  undefined
);

export const useEnvisionContext = () => {
  const context = useContext(EnvisionContext);
  if (!context) {
    throw new Error(
      "useEnvisionContext must be used within an EnvisionProvider"
    );
  }
  return context;
};

interface EnvisionProviderProps {
  children: ReactNode;
}

export const EnvisionProvider: React.FC<EnvisionProviderProps> = ({
  children,
}) => {
  const [mainPrompt, setMainPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [scenes, setScenes] = useState<number>(3);
  const [script, setScript] = useState<ScriptResponse | null>(null);

  const value: EnvisionContextType = {
    mainPrompt,
    setMainPrompt,
    isLoading,
    setIsLoading,
    selectedCharacters,
    setSelectedCharacters,
    scenes,
    setScenes,
    script,
    setScript,
  };

  return (
    <EnvisionContext.Provider value={value}>
      {children}
    </EnvisionContext.Provider>
  );
};
