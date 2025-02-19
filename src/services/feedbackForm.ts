import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface FeedbackData {
  name: string;
  phoneNumber: string;
  email: string;
  text: string;
  allowPersonalDataProcessing: boolean;
}

export const sendFeedback = (data: FeedbackData): Promise<void> =>
  api(`${baseUrl}api/v1/home/feedback-form`, {
    method: "POST",
    data,
  });
