export type Character = {
  name: number;
  trigger_word: string;
  image: string;
}

export interface CharacterSelection {
  selectedCharacters: Character[];
  sceneCount: number;
}

export interface CharacterSelectionProps {
  onSelectionChange: (selection: CharacterSelection) => void;
}