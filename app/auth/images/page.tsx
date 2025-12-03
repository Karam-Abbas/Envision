"use client";
import axiosInstance from "@/lib/axiosInterceptor";
import { GenerateImageResponse, SceneImageResponse } from "@/types/scriptTypes";
import { EditAllImagesResponse, EditImageResponse } from "@/types/imageTypes";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useEnvisionContext } from "@/contexts";
import { Button } from "@/components/ui/button";
import EditDialog from "@/components/EditDialog";
import ImageCard from "@/components/ImageCard";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
const page = () => {
  const { script, images, setImages } = useEnvisionContext();
  const [isLoading, setIsLoadingLocal] = useState(false);
  const [isEditAllDialogOpen, setIsEditAllDialogOpen] = useState(false);
  const [isEditSceneDialogOpen, setIsEditSceneDialogOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<SceneImageResponse | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const generateImages = async (project_id: string) => {
    try {
      setIsLoadingLocal(true);
      const { data } = await axiosInstance.post<GenerateImageResponse>(
        `/api/generate-images/`,
        {
          project_id: project_id,
        }
      );
      setImages(data.data.scenes);
    } catch (error) {
      toast.error("Error accepting script");
    } finally {
      setIsLoadingLocal(false);
    }
  };

  const handleEditAllImages = async (inputData: {
    instruction: string;
    style: string;
  }) => {
    try {
      setIsSubmitting(true);
      setIsEditAllDialogOpen(true);
      const { data } = await axiosInstance.post<EditAllImagesResponse>(
        `/api/edit-all-images/`,
        {
          project_id: script?.data.project_id,
          edit_instructions: inputData.instruction,
          style: inputData.style,
        }
      );
      setImages(
        data.data.edited_scenes.map((scene) => ({
          scene_number: scene.scene_number,
          scene_title: scene.scene_title,
          image: scene.edited_image,
        }))
      );
      toast.success("All images have been edited successfully");
    } catch (error) {
      toast.error("Error editing all images");
    } finally {
      setIsSubmitting(false);
      setIsEditAllDialogOpen(false);
    }
  };

  const handleEditSingleImage = async (inputData: {
    instruction: string;
    style: string;
  }) => {
    try {
      setIsSubmitting(true);
      setIsEditSceneDialogOpen(true);
      const { data } = await axiosInstance.post<EditImageResponse>(
        `/api/edit-image/`,
        {
          project_id: script?.data.project_id,
          scene_number: selectedScene?.scene_number,
          edit_instructions: inputData.instruction,
          style: inputData.style,
        }
      );
      if (images) {
        setImages(
          images.map((image) =>
            image.scene_number === selectedScene?.scene_number
              ? { ...image, image: data.data.edited_image }
              : image
          )
        );
      }
      toast.success("Image has been edited successfully");
    } catch (error) {
      toast.error("Error editing scene");
    } finally {
      setIsSubmitting(false);
      setIsEditSceneDialogOpen(false);
    }
  };
  const hasFetchedImagesRef = useRef(false);
  useEffect(() => {
    if (!script?.data.project_id) return;
    if (hasFetchedImagesRef.current) return;

    hasFetchedImagesRef.current = true;
    generateImages(script.data.project_id);
  }, [script?.data.project_id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 flex-1">
        <div className="text-xl flex flex-col items-center justify-center gap-2">
          <Spinner className="size-8" /> Crafting Your Imagination
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 flex-1">
        <div className="text-lg">No images available</div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col p-4 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {script?.data.original_prompt}
            </h2>
            <p className="text-muted-foreground">
              {script?.data.total_scenes} scenes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              onClick={() => router.push(`/auth/video-generation`)}
              disabled={isLoading || isSubmitting}
            >
              Accept Images
            </Button>
            <Button
              onClick={() => setIsEditAllDialogOpen(true)}
              variant="outline"
              disabled={isSubmitting}
            >
              Edit All
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {images.map((image) => (
              <ImageCard
                key={image.scene_number}
                image={image}
                onEdit={() => {
                  setSelectedScene(image);
                  setIsEditSceneDialogOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Edit All Images */}
      <EditDialog
        isOpen={isEditAllDialogOpen}
        onClose={() => setIsEditAllDialogOpen(false)}
        title="Edit All Scenes"
        description="Provide instructions on how all scenes should be edited. Anything you forgot? For example: adjust lighting, add props, modify background, specify a consistent art style..."
        placeholder="e.g., Make all scenes more dramatic, add more dialogue, change the tone to be more comedic..."
        onSubmit={handleEditAllImages}
        isLoading={isSubmitting}
        secondaryLabel="Style"
        secondaryPlaceholder="e.g., detailed, cartoon, watercolor, etc."
        secondaryInitialValue=""
      />

      {/* Edit Single Image */}
      <EditDialog
        isOpen={isEditSceneDialogOpen}
        onClose={() => {
          setIsEditSceneDialogOpen(false);
          setSelectedScene(null);
        }}
        title={`Edit Scene ${selectedScene?.scene_number}: ${selectedScene?.scene_title}`}
        description="Provide instructions on how this specific scene should be edited. Anything you forgot? Background details, color scheme, lighting, art style, character expressions, etc."
        placeholder="e.g., Make this scene more intense, add more character development, change the dialogue..."
        onSubmit={handleEditSingleImage}
        isLoading={isSubmitting}
        secondaryLabel="Style"
        secondaryPlaceholder="e.g., detailed, cartoon, watercolor, etc."
        secondaryInitialValue=""
      />
    </>
  );
};

export default page;
