import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosInstance";
import { endpoints } from "../../api/endpoints";

export const useGetRequest = (params = {}) => {
  return useQuery({
    queryKey: ["requests", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get(endpoints?.GET_REQUESTS, {
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
