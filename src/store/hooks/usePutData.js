import { useMutation, useQueryClient } from "react-query";
import { BACKEND_API } from "../utils/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const usePutData = () => {
  const queryClient = useQueryClient();
  // const { token } = useAuthContext();

  return useMutation({
    mutationFn: async ({ endpoint, Id, data }) => {
      try {
        const response = await BACKEND_API.put(`${endpoint}/${Id}`, data);

        if (response?.status === 200) {
          const successMessage =
            response.data.message || "Data successfully updated!";
          toast.success(successMessage);
          queryClient.invalidateQueries(/* specify your query key here */);
        } else {
          const errorMessage = response.data?.message || "Error updating data";
          toast.error(errorMessage);
        }

        return response;
      } catch (error) {
        toast.error(error?.response?.data?.message);

        // throw error;
      }
    },
  });
};

export default usePutData;
