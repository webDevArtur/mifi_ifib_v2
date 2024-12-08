import { z } from "zod";

const EquipmentSchema = z.object({
  id: z.number(),
  equipment_group: z.string(),
  name: z.string(),
  description: z.string(),
  cover: z.string(),
  model: z.string(),
});

export const EquipmentResponseSchema = z.object({
  totalItems: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  items: z.array(EquipmentSchema),
});
