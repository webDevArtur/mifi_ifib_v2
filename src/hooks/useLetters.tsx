import { useQuery } from "@tanstack/react-query";
import { getLetters } from "services/getLetters";

interface LettersResponse {
  english: string[];
  russian: string[];
}

// Хук useLetters
export const useLetters = (knowledgeBase?: string) => 
  useQuery<LettersResponse>({
    queryKey: ["letters", knowledgeBase],
    queryFn: async () => getLetters(knowledgeBase),
    throwOnError: false,
  });
