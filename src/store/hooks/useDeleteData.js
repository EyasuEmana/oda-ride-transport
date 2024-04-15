import { useMutation, useQueryClient } from "react-query";
import { BACKEND_API } from "../utils/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useDeleteData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ endpoint, Id }) => {
      const response = await BACKEND_API.delete(`${endpoint}/${Id}`);

      if (response.status === 200) {
        const successMessage =
          response.success && response.message
            ? response?.message
            : "Data successfully Deleted!";
        toast.success(successMessage);
      } else {
        const errorMessage = response.response
          ? response.response.data.message
          : "Error to delete data";
        toast.error(errorMessage);
      }

      return response;
    },
  });
};

export default useDeleteData;
