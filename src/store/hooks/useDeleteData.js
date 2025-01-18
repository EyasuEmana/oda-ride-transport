import { useMutation } from "react-query";
import { BACKEND_API } from "../utils/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useDeleteData = () => {
  return useMutation({
    mutationFn: async ({ endpoint, Id }) => {
      try {
        const response = await BACKEND_API.delete(`${endpoint}/${Id}`);

        if (response.status === 200 || response.status === 201) {
          const successMessage =
            response.success && response.message
              ? response.message
              : "Data successfully Deleted!";
          toast.success(successMessage);
        } else {
          const errorMessage = response.response
            ? response.response.data.message
            : "Error to delete data";
          toast.error(errorMessage);
        }

        return response;
      } catch (error) {
        // Handle error
        toast.error("An error occurred while deleting data or data not available");
      }
    },
  });
};

export default useDeleteData;
