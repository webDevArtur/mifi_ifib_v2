import { useQuery } from "@tanstack/react-query";
import { getDocContent } from "services/docs";
import { techObjectsKeys } from "./keys";

export const useDocContent = (category?: string, filename?: string) => {
  return useQuery({
    queryKey: [techObjectsKeys.docContent, category, filename],
    queryFn: () => {
      if (!category || !filename) return Promise.reject("Некорректные параметры запроса");
      return getDocContent(category, filename);
    },
    enabled: !!category && !!filename,
    throwOnError: false,
  });
};
