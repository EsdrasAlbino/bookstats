import { AxiosResponse } from "axios";
import { api } from "../api";
import { Book } from "./books";

export const fetchBookById = async (id: string) => {
  try {
    const response: AxiosResponse<Book> = await api.get(`/v1/volumes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
    return null;
  }
};
