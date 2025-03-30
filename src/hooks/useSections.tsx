import { useQuery } from "@tanstack/react-query";
import { getSections, SectionsResponse } from "services/sections";
import { techObjectsKeys } from "./keys";

const sectionsQuery = () => ({
  queryKey: [techObjectsKeys.sections],
  queryFn: async () => getSections(),
});

export const useSections = () =>
  useQuery<SectionsResponse>({
    ...sectionsQuery(),
    throwOnError: false,
  });
