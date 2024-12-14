import { useQuery } from "@tanstack/react-query";
import { getEquipments, getEquipmentGroups } from "services/equipments";
import { EquipmentResponse, EquipmentGroupsResponse } from "entities";
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

const equipmentGroupsQuery = () => ({
  queryKey: [techObjectsKeys.equipmentGroups],
  queryFn: getEquipmentGroups,
});

export const useEquipmentGroups = () =>
  useQuery<EquipmentGroupsResponse[]>({
    ...equipmentGroupsQuery(),
    throwOnError: false,
  });

