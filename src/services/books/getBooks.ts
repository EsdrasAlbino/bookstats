import { AxiosResponse } from "axios";
import { api } from "../api";
import { VolumeList } from "./books";

export const fetchBooks = async (
  query: string,
  startIndex: number,
  maxResults: number
) => {
  try {
    const response: AxiosResponse<VolumeList> = await api.get("/v1/volumes", {
      params: {
        q: query || "Harry Potter",
        startIndex,
        maxResults,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    //return [];
  }
};
