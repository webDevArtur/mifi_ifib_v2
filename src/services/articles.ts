import { api } from "./index";
import { ArticleResponse } from "entities/index";

export const getArticles = (
  id?: number[],
  page?: number, 
  pageSize?: number, 
  search?: string
) => {
  const params = new URLSearchParams();

  if (id && id.length > 0) {
    id.forEach((idValue) => params.append("id", idValue.toString()));
  }
  if (page !== undefined) params.append("page", page.toString());
  if (pageSize !== undefined) params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  const url = `https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/article/?${params.toString()}`;

  return api<ArticleResponse>(url, {
    method: "GET",
  });
};

export const articleAsRead = (articleId: number) =>
  api<void>(`https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/article/${articleId}/complete/`, {
    method: "POST",
  });

export const markArticle = (articleId: number) =>
  api<void>(`https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/article/${articleId}/mark/`, {
    method: "POST",
  });
  
