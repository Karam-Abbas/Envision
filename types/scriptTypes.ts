export type Scene = {
    scene_number: number;
    scene_title: string;
    script: string; // paragraph
    story_context: string; // paragraph
    trigger_word: string;
}

export type ScriptResponse = {
    status: string;
    message: string;
    data: {
      project_title: string;
      original_prompt: string;
      trigger_word: string;
      character_exists: boolean;
      character_name: string;
      total_scenes: number;
      scenes: Scene[]
    }
  }