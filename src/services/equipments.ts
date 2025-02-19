import { api } from "./index";
import { EquipmentResponse, EquipmentGroupsResponse } from "entities/index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getEquipments = (
  page?: number,
  size?: number,
  search?: string,
  equipmentGroup?: string,
  ids?: number[]
) => {
  const searchQuery = search ? `&name=${search}` : "";
  const equipmentGroupQuery = equipmentGroup ? `&equipment_group=${equipmentGroup}` : "";
  const idsQuery = ids && ids.length > 0 ? `&id=${ids.join(',')}` : "";

  const url = `${baseUrl}api/v1/nuclear-medicine-intro/equipment?page=${page}&pageSize=${size}${searchQuery}${equipmentGroupQuery}${idsQuery}`;

  return api<EquipmentResponse>(url, {
    method: "GET",
  });
};

export const getEquipmentGroups = () => {
  const url = `${baseUrl}api/v1/nuclear-medicine-intro/equipment/groups/`;

  return api<EquipmentGroupsResponse[]>(url, {
    method: "GET",
  });
};