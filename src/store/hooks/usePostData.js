import { useMutation, useQueryClient } from "react-query";
import { BACKEND_API } from "../utils/API";
import { toast } from "react-toastify";

const postData = async (endpoint, data) => {
  try {
   
    const response = await BACKEND_API.post(endpoint, data);

    if (response.status === 200 || response.status === 201) {
      toast.success(response?.data?.message || `Successfully added!`, {
        // position: toast.POSITION.TOP_CENTER
      });
      // return response.data;
    }
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error...", {
      // position: toast.POSITION.TOP_CENTER
    });
    // throw error?.response?.data;
  }
};

const usePostData = (endpoint) => {
//  console.log("posting")
  const queryClient = useQueryClient();
  const makeRequest = async (data) => {
    return await postData(endpoint,  data);
  };

  return useMutation(makeRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(/* specify your query key here */);
    },
  });
};

export default usePostData;