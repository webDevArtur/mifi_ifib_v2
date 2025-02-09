import { api } from "./index";
import { ProgressStatisticsResponse } from "entities";

export const getProgressStatistics = () =>
  api<ProgressStatisticsResponse>(
    `v1/user/progress_statistics/`
  );
