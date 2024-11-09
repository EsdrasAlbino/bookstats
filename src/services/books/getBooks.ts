import { AxiosResponse } from "axios";
import { api } from "../api";
import { Volume } from "./books";

export const fetchBooks = async (query: string) => {
  try {
    const response:AxiosResponse<Volume> = await api.get("/v1/volumes", {
      params: {
        q: query,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
};
