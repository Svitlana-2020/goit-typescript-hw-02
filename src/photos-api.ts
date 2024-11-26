import axios from "axios";
import { ApiResponse } from "./App.types";

export const fetchPhotosByTitle = async (title: string, page: number): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(`https://api.unsplash.com/search/photos`, {
        params: {
          query: title,
          client_id: 'c5Fj6Lu1o7-m2UrVqvMUlR8r7rvHkIUekKVz-9edbYQ',
          page: page,
          per_page: 10,
                }
      });
      
  return response.data;
  
};