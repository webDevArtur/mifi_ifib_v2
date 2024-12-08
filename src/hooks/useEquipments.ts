import { useQuery } from "@tanstack/react-query";
import { getEquipments } from "services/equipments";
import { EquipmentResponse } from "entities";
import { techObjectsKeys } from "./keys";

const equipmentsQuery = (page: number, size: number, search?: string, equipmentGroup?: string, ids?: number[]) => ({
  queryKey: [techObjectsKeys.articles, { page, size, search, equipmentGroup, ids }],
  queryFn: async () => getEquipments(page, size, search, equipmentGroup, ids),
});

export const useEquipments = (page: number, size: number, search?: string, equipmentGroup?: string, ids?: number[]) =>
  useQuery<EquipmentResponse>({
    ...equipmentsQuery(page, size, search, equipmentGroup, ids),
    throwOnError: false,
  });
