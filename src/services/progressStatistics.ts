import { api } from "./index";
import { ProgressStatisticsResponse } from "entities";

export const getProgressStatistics = () =>
  api<ProgressStatisticsResponse>(
    `https://medphysicists-stage.ru/api/v1/user/progress_statistics/`
  );
