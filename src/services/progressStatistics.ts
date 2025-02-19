import { api } from "./index";
import { ProgressStatisticsResponse } from "entities";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getProgressStatistics = () =>
  api<ProgressStatisticsResponse>(
    `${baseUrl}api/v1/user/progress_statistics/`
  );
