import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export async function fetchData<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.request<T>(config);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching data"
    );
  }
}
  export interface IModifiedRow {
    index: number;
    data: any[];
    isNew: boolean;
  }


import { writable } from "svelte/store";

// Create a writable store for user authentication status
export const modifiedRowsStore = writable<IModifiedRow[]>([]);