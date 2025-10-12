export type Scene = {
  // send id here too
  scene_number: number;
  scene_title: string;
  script: string; // paragraph
  story_context: string; // paragraph
  trigger_word: string;
};

export type ScriptResponse = {
  status: string;
  message: string;
  data: {
    project_id: string;
    project_title: string;
    original_prompt: string;
    trigger_word: string;
    character_exists: boolean;
    character_name: string;
    total_scenes: number;
    scenes: Scene[];
  };
};

export interface editSceneResponse {
  status: string;
  message: string;
  data: {
    updated_scene: {
      id: string;
      scene_number: number;
      script: string;
      story_context: string;
      created_at: string;
      project_title: string;
      scene_title: string; // send proper title not Scene 1
    };
    edit_instructions_used: string;
  };
  next_step: string;
  available_actions: string[];
}

export interface editAllScenesResponse {
  status: string;
  message: string;
  data: {
    project: {
      title: string;
      concept: string;
      num_scenes: number;
      creativity_level: string;
      created_at: string;
      updated_at: string;
      scenes: {
        id: string;
        scene_number: number;
        script: string;
        story_context: string;
        created_at: string;
        project_title: string;
        scene_title: string; // send proper title not Scene 1
      }[];
    };
    scenes_updated_count: number;
    total_scenes: number;
    edit_instructions_used: string;
  };
  next_step: string;
  available_actions: string[];
}
