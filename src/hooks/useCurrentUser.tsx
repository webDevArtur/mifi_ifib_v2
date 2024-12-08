import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "services/currentUser";
import { CurrentUserResponse } from "entities";
import { techObjectsKeys } from "./keys";

const currentUserQuery = () => ({
  queryKey: [techObjectsKeys.currentUser],
  queryFn: async () => getCurrentUser(),
});

export const useCurrentUser = () =>
  useQuery<CurrentUserResponse>({
    ...currentUserQuery(),
    throwOnError: false,
  });
