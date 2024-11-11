import { AxiosResponse } from "axios";
import { api } from "../api";
import { Volume } from "./books";

export const fetchBook = async (id: string) => {
  try {
    const response:AxiosResponse<Volume> = await api.get(`v1/volumes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
  }
};
