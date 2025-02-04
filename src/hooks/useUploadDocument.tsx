import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { uploadDocument } from "services/uploadDocument";

export const useUploadDocument = () => {
  return useMutation<void, AxiosError, File>({
    mutationFn: async (file) => {
      return uploadDocument(file);
    },
    onError: (error) => {
      console.error("Upload document error:", error);
    },
  });
};
