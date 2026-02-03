import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosInstance";
import { endpoints } from "../../api/endpoints";

export const useCreateDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (donationData) => {
      const { data } = await axiosInstance.post(
        endpoints?.CREATE_DONATION,
        donationData,
      );
      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch donations query
      queryClient.invalidateQueries(["donations"]);

      // If you have a stats query, invalidate that too
      queryClient.invalidateQueries(["donation-stats"]);

      // Return success data for the component to use
      return data;
    },
    onError: (error) => {
      // Handle error - you can throw it or return custom error
      throw error;
    },
  });
};
