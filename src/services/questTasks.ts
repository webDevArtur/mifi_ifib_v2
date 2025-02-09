import { api } from "./index";
import { QuestTasksResponse } from "entities";

export const getQuestTasks = (
  quest?: number[],
  orderNum?: number,
  page?: number,
  size?: number
) => {
  const questQuery = quest && quest.length > 0 ? `&quest=${quest.join(",")}` : "";
  const orderNumQuery = orderNum ? `&order_num=${orderNum}` : "";
  const pageQuery = page ? `&page=${page}` : "";
  const sizeQuery = size ? `&pageSize=${size}` : "";

  const url = `v1/quests/tasks/?${questQuery}${orderNumQuery}${pageQuery}${sizeQuery}`;

  return api<QuestTasksResponse>(url, {
    method: "GET",
  });
};

interface SubmitQuestTaskRequest {
    options?: number[];
    text?: string;
  }
  
  interface SubmitQuestTaskResponse {
    score: number;
    isCorrect: boolean;
    userInput: {
      options: number[];
      order_options: number[];
      text: string;
    };
  }
  
  export const submitQuestTask = (
    questTaskId: number,
    data: SubmitQuestTaskRequest
  ) => {
    const url = `v1/quests/tasks/${questTaskId}/submit/`;
  
    return api<SubmitQuestTaskResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
  };
  