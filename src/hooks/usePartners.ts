import { useQuery } from "@tanstack/react-query";
import { getPartners } from "services/partners";
import { PartnersResponse } from "entities";

const partnersQuery = () => ({
  queryKey: ["partners"],
  queryFn: async () => getPartners(),
});

export const usePartners = () =>
  useQuery<PartnersResponse[]>({
    ...partnersQuery(),
    throwOnError: false,
  });