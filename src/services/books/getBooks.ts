import { AxiosResponse } from "axios";
import { api } from "../api";
import { VolumeList } from "./books";

export const fetchBooks = async (query: string) => {
  try {
    const response:AxiosResponse<VolumeList> = await api.get("/v1/volumes", {
      params: {
        q: query || "Harry Potter",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
};
