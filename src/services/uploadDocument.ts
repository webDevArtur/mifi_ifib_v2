import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const uploadDocument = (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  return api("${baseUrl}api/v1/user/upload-document/", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
