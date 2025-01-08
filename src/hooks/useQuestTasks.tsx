import { useQuery, useMutation } from "@tanstack/react-query";
import { getQuestTasks, submitQuestTask } from "services/questTasks";
import { QuestTasksResponse } from "entities";
import { techObjectsKeys } from "./keys";

const questTasksQuery = (
  quest?: number[],
  orderNum?: number,
  page?: number,
  size?: number
) => ({
  queryKey: [techObjectsKeys.questTasks, { quest, orderNum, page, size }],
  queryFn: async () => getQuestTasks(quest, orderNum, page, size),
});

export const useQuestTasks = (
  quest?: number[],
  orderNum?: number,
  page?: number,
  size?: number
) =>
  useQuery<QuestTasksResponse>({
    ...questTasksQuery(quest, orderNum, page, size),
    throwOnError: false,
});

interface SubmitQuestTaskRequest {
    options?: number[];
    text?: string;
  }
  
  interface SubmitQuestTaskResponse {
    score: number;
    isCorrect: boolean;
    userInput: {
      options: number[];
      text: string;
    };
  }

  export const useSubmitQuestTask = () => {
    return useMutation<
      SubmitQuestTaskResponse,
      Error,
      { questTaskId: number; data: SubmitQuestTaskRequest }
    >({
      mutationFn: async ({ questTaskId, data }) => {
        return submitQuestTask(questTaskId, data);
      },
      onError: (error) => {
        console.error("Ошибка при выполнении задания квеста:", error);
      },
      onSuccess: (response) => {
        console.log("Задание выполнено успешно:", response);
      },
    });
  };
