"use client";
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "@/lib/axiosInterceptor";
import { useEnvisionContext } from "@/contexts";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { videoGenApiResponse } from "@/types/videoGenTypes";
const page = () => {
  const { script } = useEnvisionContext();
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const generateVideo = async (project_id: string) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post<videoGenApiResponse>(
        `/api/generate-video/`,
        {
          project_id: project_id,
        }
      );

      // Convert base64 string to blob
      const base64String = data.final_video_base64;
      // Remove data URL prefix if present (e.g., "data:video/mp4;base64,")
      const base64Data = base64String.includes(",")
        ? base64String.split(",")[1]
        : base64String;

      // Convert base64 to binary
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Create blob from binary data
      const blob = new Blob([bytes], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      toast.success("Video generated successfully");
    } catch (error) {
      toast.error("Error generating video");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!script?.data.project_id) return;
    if (hasFetched.current) return;

    hasFetched.current = true;
    generateVideo(script.data.project_id);
  }, [script?.data.project_id]);

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 flex-1 min-h-screen">
        <div className="text-xl flex flex-col items-center justify-center gap-2">
          <Spinner className="size-8" /> Generating Your Video
        </div>
      </div>
    );
  }

  if (!loading && !videoUrl) {
    return (
      <div className="flex items-center justify-center p-8 flex-1 min-h-screen">
        <div className="text-lg">No video available</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 flex-1 min-h-screen">
      <div className="w-full max-w-4xl">
        <video
          src={videoUrl!}
          controls
          className="w-full h-auto rounded-lg shadow-lg"
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default page;
