import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { editAllScenesResponse, ScriptResponse } from "@/types/scriptTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function mapEditAllScenesResponseToScriptResponse(
  response: editAllScenesResponse,
  script: ScriptResponse
): ScriptResponse {
  return {
    status: response.status,
    message: response.message,
    data: {
      project_id: script.data.project_id,
      project_title: response.data.project.title,
      original_prompt: script.data.original_prompt,
      trigger_word: script.data.trigger_word,
      character_exists: script.data.character_exists,
      character_name: script.data.character_name,
      total_scenes: response.data.total_scenes,
      scenes: response.data.project.scenes.map((scene) => ({
        scene_number: scene.scene_number,
        scene_title: scene.scene_title,
        script: scene.script,
        story_context: scene.story_context,
        trigger_word: script.data.trigger_word,
      })),
    },
  };
}