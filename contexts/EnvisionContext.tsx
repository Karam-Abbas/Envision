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
  const [script, setScript] = useState<ScriptResponse | null>({
    status: "success",
    message: "Generated 2 scenes from script generation workflow.",
    data: {
      project_id: "123",
      project_title: "Generated from: surviving an earthquake",
      original_prompt: "surviving an earthquake",
      trigger_word: "princess merida",
      character_exists: true,
      character_name: "Merida",
      total_scenes: 2,
      scenes: [
        {
          scene_number: 1,
          scene_title: "Before the Quake",
          script:
            "princess merida stands in the midst of a bustling market, surrounded by vibrant stalls selling colorful fabrics, fresh produce, and exotic spices. Her long, fiery hair is tied back in a ponytail, and her bright green eyes are fixed on a beautiful handmade loom. She runs her fingers over the intricate patterns woven into the fabric, her expression a mix of wonder and focus. The sounds of the market - vendors calling out their wares, the clinking of pots and pans - fill the air, and the scent of freshly baked bread wafts through the crowd. Suddenly, the ground beneath her feet begins to tremble, and the sound of murmured conversations and clinking dishes grows anxious.",
          story_context:
            "princess merida stands in the midst of a bustling market, surrounded by vibrant stalls selling colorful fabrics, fresh produce, and exotic spices. Her long, fiery hair is tied back in a ponytail, and her bright green eyes are fixed on a beautiful handmade loom. She runs her fingers over the intricate patterns woven into the fabric, her expression a mix of wonder and focus. The sounds of the market - vendors calling out their wares, the clinking of pots and pans - fill the air, and the scent of freshly baked bread wafts through the crowd. Suddenly, the ground beneath her feet begins to tremble, and the sound of murmured conversations and clinking dishes grows anxious.",
          trigger_word: "princess merida",
        },
        {
          scene_number: 2,
          scene_title: "Riding Out the Quake",
          script:
            "princess merida stumbles through the chaotic market, her long legs fighting to maintain balance as the earth shudders and rumbles. She grabs onto a nearby stall, using it as a pivot point to keep herself upright. The colorful fabrics and textiles seem to blur together as the market stalls sway and topple, their contents spilling onto the ground. A nearby vendor's cart tips over, sending baskets of fresh fruit flying in all directions. Princess merida ducks and weaves, her eyes scanning the scene for any signs of danger. As the quake intensifies, she leaps onto a nearby horse, which has somehow remained calm amidst the chaos, and begins to gallop through the streets, the market's frantic sounds fading into the distance.",
          story_context:
            "princess merida stumbles through the chaotic market, her long legs fighting to maintain balance as the earth shudders and rumbles. She grabs onto a nearby stall, using it as a pivot point to keep herself upright. The colorful fabrics and textiles seem to blur together as the market stalls sway and topple, their contents spilling onto the ground. A nearby vendor's cart tips over, sending baskets of fresh fruit flying in all directions. Princess merida ducks and weaves, her eyes scanning the scene for any signs of danger. As the quake intensifies, she leaps onto a nearby horse, which has somehow remained calm amidst the chaos, and begins to gallop through the streets, the market's frantic sounds fading into the distance.",
          trigger_word: "princess merida",
        },
      ],
    },
  });

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
