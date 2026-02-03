import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "../../api/endpoints";
import { toast } from "react-toastify";
import axiosInstance from "../../api/AxiosInstance";

// Get all users with pagination
export const useGetUserList = (params = {}) => {
  return useQuery({
    queryKey: ["users", params], // This will automatically refetch when params change
    queryFn: async () => {
      const { data } = await axiosInstance.get(endpoints?.GET_USERS, {
        params: {
          page: params.page || 1,
          limit: params.size || 10,
          search: params.search || "",
        },
      });
      return data;
    },
    keepPreviousData: true, // This keeps the previous data while fetching new data
  });
};
// Delete user by ID
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      // Replace :id with actual userId in the endpoint
      const endpoint = endpoints?.USER_DELETE.replace(":id", userId.toString());
      const { data } = await axiosInstance.delete(endpoint);
      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch users query to update the list
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message || "User deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete user",
      );
    },
  });
};
