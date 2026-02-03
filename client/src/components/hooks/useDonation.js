import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosInstance";
import { endpoints } from "../../api/endpoints";

export const useGetDonation = (params = {}) => {
  return useQuery({
    queryKey: ["donations", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get(endpoints?.GET_DONATION, {
        params: {
          page: params.page || 1,
          limit: params.size || 10,
        },
      });
      return data;
    },
    keepPreviousData: true,
  });
};

export const useDonationChartData = (userId, options = {}) => {
  return useQuery({
    queryKey: ["donationChart", userId, options.litersPerUnit],
    queryFn: async () => {
      const params = {};
      if (userId) params.userId = userId;
      if (options.litersPerUnit) params.litersPerUnit = options.litersPerUnit;

      const { data } = await axiosInstance.get(endpoints?.GET_DONATION_CHART, {
        params,
      });
      return data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
