"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SceneSelectorProps {
  sceneCount: number;
  onSceneCountChange: (count: number) => void;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({
  sceneCount,
  onSceneCountChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 6) {
      onSceneCountChange(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Label htmlFor="scene-count">Number of Scenes</Label>
      <div className="flex flex-row items-center justify-center gap-2">
      <Input
        id="scene-count"
        type="number"
        min="1"
        max="6"
        value={sceneCount}
        onChange={handleInputChange}
        className="w-full"
        />
        <div className="flex flex-col items-start justify-center text-xs text-muted-foreground">
          <p>Min:1</p>
          <p>Max:6</p>
        </div>
        </div>
    </div>
  );
};

export default SceneSelector;
