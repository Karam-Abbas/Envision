import React, { useEffect, useState } from "react";
import { ScriptResponse, Scene } from "@/types/scriptTypes";
import axiosInstance from "@/lib/axiosInterceptor";
import { useEnvisionContext } from "@/contexts";
import SceneCard from "./SceneCard";
import EditDialog from "./EditDialog";
import { Button } from "./ui/button";

const ScriptGenerator = ({ scenes }: { scenes: number }) => {
  const [script, setScript] = useState<ScriptResponse | null>({
    status: "success",
    message: "Generated 2 scenes from script generation workflow.",
    data: {
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
  const { mainPrompt } = useEnvisionContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditAllDialogOpen, setIsEditAllDialogOpen] = useState(false);
  const [isEditSceneDialogOpen, setIsEditSceneDialogOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getScript = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post<ScriptResponse>(
        `/api/generate-scenes/`,
        {
          num_scenes: scenes,
          prompt: mainPrompt,
        }
      );
      setScript(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAll = async (instruction: string) => {
    if (!script) return;

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post<ScriptResponse>(
        `/api/edit-script/`,
        {
          script_id: script.data.project_title, // Assuming this is the identifier
          instruction: instruction,
        }
      );
      setScript(response.data);
      setIsEditAllDialogOpen(false);
    } catch (error) {
      console.error("Error editing script:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditScene = async (instruction: string) => {
    if (!selectedScene || !script) return;

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post<ScriptResponse>(
        `/api/edit-scene/`,
        {
          scene_id: selectedScene.scene_number,
          instruction: instruction,
        }
      );
      setScript(response.data);
      setIsEditSceneDialogOpen(false);
      setSelectedScene(null);
    } catch (error) {
      console.error("Error editing scene:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSceneEditDialog = (scene: Scene) => {
    setSelectedScene(scene);
    setIsEditSceneDialogOpen(true);
  };

  //   useEffect(() => {
  //     getScript();
  //   }, [scenes, mainPrompt]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Generating script...</div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">No script available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{script.data.original_prompt}</h2>
          <p className="text-muted-foreground">
            {script.data.total_scenes} scenes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default">Accept Script</Button>
          <Button
            onClick={() => setIsEditAllDialogOpen(true)}
            variant="outline"
          >
            Edit All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {script.data.scenes.map((scene) => (
          <SceneCard
            key={scene.scene_number}
            scene={scene}
            onEdit={openSceneEditDialog}
          />
        ))}
      </div>

      {/* Edit All Dialog */}
      <EditDialog
        isOpen={isEditAllDialogOpen}
        onClose={() => setIsEditAllDialogOpen(false)}
        title="Edit All Scenes"
        description="Provide instructions on how all scenes should be edited."
        placeholder="e.g., Make all scenes more dramatic, add more dialogue, change the tone to be more comedic..."
        onSubmit={handleEditAll}
        isLoading={isSubmitting}
      />

      {/* Edit Scene Dialog */}
      <EditDialog
        isOpen={isEditSceneDialogOpen}
        onClose={() => {
          setIsEditSceneDialogOpen(false);
          setSelectedScene(null);
        }}
        title={`Edit Scene ${selectedScene?.scene_number}: ${selectedScene?.scene_title}`}
        description="Provide instructions on how this specific scene should be edited."
        placeholder="e.g., Make this scene more intense, add more character development, change the dialogue..."
        onSubmit={handleEditScene}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ScriptGenerator;
