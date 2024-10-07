import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { sendFeedback } from 'services/feedbackForm';

interface FeedbackData {
    name: string;
    phoneNumber: string;
    email: string;
    text: string;
    allowPersonalDataProcessing: boolean;
}

export const useFeedback = () => {
  return useMutation<void, AxiosError, FeedbackData>({
    mutationFn: async (data) => {
      return sendFeedback(data);
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
};