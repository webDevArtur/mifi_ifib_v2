import { api } from './index';
import { ArticleResponse } from 'entities/index';

export const getEquipments = (page?: number, size?: number, search?: string) => {
  const searchQuery = search ? `&searchName=${search}` : '';

  return api<ArticleResponse>(
    `https://cybernexvpn-stage.ru/api/v1/equipment?pageNumber=${page}&pageSize=${size}${searchQuery}`,
    {
      method: 'GET',
    }
  );
};
