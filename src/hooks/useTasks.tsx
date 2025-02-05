import { useQuery } from "@tanstack/react-query";
import { getTasks, TaskResponse } from "services/getTasks";

const tasksQuery = (knowledgeBase?: string) => ({
  queryKey: ['tasks', { knowledgeBase }],
  queryFn: async () => getTasks(knowledgeBase),
});

export const useTasks = (knowledgeBase?: string) =>
  useQuery<TaskResponse[]>({
    ...tasksQuery(knowledgeBase),
    throwOnError: false,
  });
