import React from "react";
import { Scene } from "@/types/scriptTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const SceneCard = ({
  scene,
  onEdit,
}: {
  scene: Scene;
  onEdit: (scene: Scene) => void;
}) => {
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
      <CardContent>
        <div>
          <h4 className="font-semibold text-base mb-1">Script</h4>
          <p className="text-sm text-muted-foreground">{scene.script}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SceneCard;
