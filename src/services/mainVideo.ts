import { api } from "./index";
import { MainVideoResponse } from "entities/index";

export const getMainVideo = () =>
  api<MainVideoResponse>(
    `https://medphysicists-stage.ru/api/v1/home/media/main-video`,
);
