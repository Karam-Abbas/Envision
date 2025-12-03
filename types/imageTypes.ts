export interface EditImageData {
  scene_number: number;
  scene_title: string;
  edited_image: string;
}

export interface EditImageResponse {
  status: string;
  message: string;
  data: EditImageData;
}

export interface EditAllImagesResponse {
  status: string;
  message: string;
  data: {
    project_id: string;
    project_title: string;
    edited_scenes: EditImageData[];
  };
}
