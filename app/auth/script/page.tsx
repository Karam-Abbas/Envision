"use client";
import React, { useEffect, useState } from "react";
import { ScriptResponse, Scene } from "@/types/scriptTypes";
import axiosInstance from "@/lib/axiosInterceptor";
import { useEnvisionContext } from "@/contexts";
import SceneCard from "@/components/SceneCard";
import EditDialog from "@/components/EditDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ScriptPage() {
  const { mainPrompt, scenes, script, setScript } = useEnvisionContext();
  const [isLoading, setIsLoadingLocal] = useState(false);
  const [isEditAllDialogOpen, setIsEditAllDialogOpen] = useState(false);
  const [isEditSceneDialogOpen, setIsEditSceneDialogOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getScript = async () => {
    try {
      setIsLoadingLocal(true);
      const response = await axiosInstance.post<ScriptResponse>(
        `/api/generate-scenes/`,
        {
          num_scenes: scenes,
          prompt: mainPrompt,
        }
      );
      setScript(response.data);
    } catch (error) {
      toast.error("Error generating script");
    } finally {
      setIsLoadingLocal(false);
    }
  };

  const handleEditAll = async (instruction: string) => {
    if (!script) return;

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post<ScriptResponse>(
        `/api/edit-all-scenes/`,
        {
          project_id: 0, // Replace with the project id
          instruction: instruction,
        }
      );
      setScript(response.data);
    } catch (error) {
      toast.error("Error editing all scenes of the script");
    } finally {
      setIsSubmitting(false);
      setIsEditAllDialogOpen(false);
    }
  };

  const handleEditScene = async (instruction: string) => {
    if (!selectedScene || !script) return;

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post<ScriptResponse>(
        `/api/edit-scene/`,
        {
          project_id: 0, // replace with original project id
          scene_id: selectedScene.scene_number,
          instruction: instruction,
        }
      );
      setScript(response.data);
      setSelectedScene(null);
    } catch (error) {
      toast.error(`Error editing scene ${selectedScene?.scene_number} of the script`);
    } finally {
      setIsEditSceneDialogOpen(false);
      setIsSubmitting(false);
    }
  };

  const openSceneEditDialog = (scene: Scene) => {
    setSelectedScene(scene);
    setIsEditSceneDialogOpen(true);
  };

  useEffect(() => {
    getScript();
  }, [scenes, mainPrompt]);

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
}
