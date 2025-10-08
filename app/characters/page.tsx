"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInterceptor";
import { useEnvisionContext } from "@/contexts";
import { Character } from "@/types/chracterTypes";
import CharacterCard from "@/components/CharacterCard";
import SceneSelector from "@/components/SceneSelector";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function CharactersPage() {
  const router = useRouter();
  const { 
    selectedCharacters, 
    setSelectedCharacters, 
    scenes, 
    setScenes,
    setIsLoading 
  } = useEnvisionContext();
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Character[]>(
        "/api/get-all-characters/"
      );
      setCharacters(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching characters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCharacterToggle = (character: Character) => {
    setSelectedCharacters((prev: Character[]) => {
      const isSelected = prev.some((c: Character) => c.name === character.name);
      if (isSelected) {
        return prev.filter((c: Character) => c.name !== character.name);
      } else {
        return [...prev, character];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedCharacters.length === 0) {
      toast.error("Please select at least one character");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/api/select-character/", {
        trigger_word: selectedCharacters[0].trigger_word,
      });
      router.push("/script");
    } catch (error) {
      toast.error("Error submitting selection");
    } finally {
      setIsLoading(false);
    }
  };

  const isCharacterSelected = (character: Character) => {
    return selectedCharacters.some((c) => c.name === character.name);
  };

  return (
    <div className="space-y-6 flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Scene Selector */}
        <SceneSelector
          sceneCount={scenes}
          onSceneCountChange={setScenes}
        />
        {/* Character Selection Info */}
        <p className="text-sm text-muted-foreground">
          Select characters for your scenes ({selectedCharacters.length} selected)
        </p>
      </div>

      {/* Character Cards */}
      {loading && characters.length === 0 ? (
        <div className="flex flex-wrap items-center justify-around gap-4 py-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-56">
              <div className="rounded-md border bg-card p-4 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-5 w-24 rounded bg-muted animate-pulse" />
                    <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
                  </div>
                  <div className="h-4 w-20 rounded bg-muted animate-pulse mb-2" />
                  <div className="flex items-center justify-center">
                    <div className="h-42 w-48 rounded-md bg-muted animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-around gap-4">
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
              isSelected={isCharacterSelected(character)}
              onToggle={() => handleCharacterToggle(character)}
            />
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={handleSubmit}
          disabled={selectedCharacters.length === 0}
          size="lg"
          className="min-w-32"
        >
          {loading && characters.length > 0 ? <Spinner /> : "Submit Selection"}
        </Button>
      </div>
    </div>
  );
}
