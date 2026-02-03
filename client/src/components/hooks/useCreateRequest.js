import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../../api/AxiosInstance";
import { endpoints } from "../../api/endpoints";
export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestData) => {
      const { data } = await axiosInstance.post(
        endpoints?.CREATE_REQUEST,
        requestData,
      );
      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch requests query
      queryClient.invalidateQueries(["requests"]);

      // If you have a stats query, invalidate that too
      queryClient.invalidateQueries(["request-stats"]);

      // Return success data for the component to use
      return data;
    },
    onError: (error) => {
      // Handle error - you can throw it or return custom error
      throw error;
    },
  });
};
