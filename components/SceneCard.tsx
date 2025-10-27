import React from "react";
import { Scene, SceneImageResponse } from "@/types/scriptTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

const SceneCard = ({
  scene,
  onEdit,
  images = [],
}: {
  scene: Scene;
  onEdit: (scene: Scene) => void;
  images: SceneImageResponse[];
}) => {
  const image = images.find(
    (image) => image.scene_number === scene.scene_number
  );
  console.log(image);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">
              {scene.scene_number}. {scene.scene_title}
            </CardTitle>
            <CardDescription>
              Trigger Words: {scene.trigger_word}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => onEdit(scene)}>
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between">
        <div>
          <h4 className="font-semibold text-base mb-1">Script</h4>
          <p className="text-sm text-muted-foreground">{scene.script}</p>
        </div>
        {image && (
          <Image
            src={image?.image || ""}
            alt={scene.scene_title}
            className="w-1/4 h-auto rounded-md mt-6"
            width={100}
            height={100}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SceneCard;
