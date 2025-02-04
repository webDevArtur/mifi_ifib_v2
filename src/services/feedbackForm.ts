import { api } from "./index";

interface FeedbackData {
  name: string;
  phoneNumber: string;
  email: string;
  text: string;
  allowPersonalDataProcessing: boolean;
}

export const sendFeedback = (data: FeedbackData): Promise<void> =>
  api("https://medphysicists-stage.ru/api/v1/home/feedback-form", {
    method: "POST",
    data,
  });
