import React from "react";
import { Card } from "./ui/card";
import { SceneImageResponse } from "@/types/scriptTypes";
import Image from "next/image";
const ImageCard = ({
  image,
  onEdit,
}: {
  image: SceneImageResponse;
  onEdit: () => void;
}) => {
  const convertBase64ToImage = (base64: string) => {
    return `data:image/png;base64,${base64}`;
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
      <div className="w-full mb-2">
        <span
          className="block text-base font-semibold truncate"
          title={image.scene_title}
        >
          {image.scene_title}
        </span>
      </div>
      <Image
        src={imageUrl}
        alt={image.scene_title || "Scene Image"}
        width={512}
        height={320}
        style={{ maxWidth: "100%", height: "auto" }}
        className="rounded-md w-full mb-4"
      />
      <div className="flex justify-center gap-2 w-full">
        <button
          type="button"
          onClick={handleDownload}
          className="px-4 py-2 bg-muted rounded hover:bg-muted/70 transition"
        >
          Download
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
        >
          Edit
        </button>
      </div>
    </Card>
  );
};

export default ImageCard;
