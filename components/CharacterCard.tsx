import { Character } from "@/types/chracterTypes";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from 'lucide-react';


interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onToggle: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSelected,
  onToggle,
}) => {
  return (
    <Card 
      onClick={onToggle}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary bg-primary/5"
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {character.name}
          {isSelected && (
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm"><Check className="w-4 h-4" /></span>
            </div>
          )}

        </CardTitle>
        <CardDescription>Trigger: {character.trigger_word}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={`${character.image}`}
          alt={character.name.toString()}
          style={{ maxWidth: "100%", height: "auto" }}
          className={cn(
            "transition-opacity duration-200 rounded-md h-10 w-48",
            isSelected ? "opacity-100" : "opacity-80"
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
