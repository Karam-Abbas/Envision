import React from "react";
import { Card } from "./ui/card";
import { SceneImageResponse } from "@/types/scriptTypes";
import Image from "next/image";
import { Download, Edit } from "lucide-react";

const ImageCard = ({
  image,
  onEdit,
}: {
  image: SceneImageResponse;
  onEdit: () => void;
}) => {
  const convertBase64ToImage = (base64: string) => {
    return `${base64}`;
  };
  const imageUrl = convertBase64ToImage(image.image);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `scene_${image.scene_number || ""}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Card className="flex flex-col items-center p-4">
      {/* Title row with buttons aligned across */}
      <div className="w-full mb-2 flex items-center justify-between gap-2">
        <span
          className="block text-base font-semibold truncate"
          title={image.scene_title}
        >
          {image.scene_title}
        </span>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            className="px-1 py-1 bg-muted rounded-md hover:bg-muted/70 transition"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-1 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
          >
            < Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
      <Image
        src={imageUrl}
        alt={image.scene_title || "Scene Image"}
        width={512}
        height={320}
        style={{ maxWidth: "100%", height: "auto" }}
        className="rounded-md w-72 mb-4"
      />
    </Card>
  );
};

export default ImageCard;
