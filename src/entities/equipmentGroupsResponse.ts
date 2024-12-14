import { z } from "zod";

export const EquipmentGroupsResponse = z.object({
    equipmentGroup: z.string(),
    size: z.number(),
});
