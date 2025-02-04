import { api } from "./index";

export const uploadDocument = (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  return api("https://medphysicists.mephi.ru/api/v1/user/upload-document/", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
