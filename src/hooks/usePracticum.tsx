import { useQuery } from "@tanstack/react-query";
import { getPractices } from "services/practicum";
import { PracticeResponse } from "entities";
import { techObjectsKeys } from "./keys";

export const practiceQuery = (id?: number[], practiceGroup?: string[]) => ({
  queryKey: [techObjectsKeys.practices, { id, practiceGroup }],
  queryFn: async () => getPractices(id, practiceGroup),
});

export const usePractices = (id?: number[], practiceGroup?: string[]) =>
  useQuery<PracticeResponse[]>({
    ...practiceQuery(id, practiceGroup),
    throwOnError: false,
  });
