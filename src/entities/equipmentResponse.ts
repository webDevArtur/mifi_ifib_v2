import { z } from "zod";

const EquipmentSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const EquipmentResponseSchema = z.object({
  totalItems: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  pageNumber: z.number(),
  items: z.array(EquipmentSchema),
});
