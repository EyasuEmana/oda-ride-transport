import { useQuery, useQueryClient } from "react-query";
import { BACKEND_API } from "../utils/API";
import { toast } from "react-toastify";

const fetchData = async (endpoint) => {
  try {
    const response = await BACKEND_API.get(endpoint);
    // console.log("data", response.data)
    if (response.status === 200 || response.status === 201) {
      toast.success(response?.data?.message || `Successfully Loaded!`, {
        // position: toast.POSITION.TOP_CENTER
      });
      return response.data.data;
    }

    // return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || " Network error...", {
      // position: toast.POSITION.TOP_CENTER
    });
    // throw error?.response?.data;
  }
};

const useGetData = (endpoint) => {
  const queryClient = useQueryClient(); // Access queryClient

  return useQuery([endpoint], () => fetchData(endpoint), {
    onSuccess: (endpoint) => {
      // // Display success message only once after successful fetch
      // if (!queryClient.getQueryData([endpoint])) {
      //   toast.success(data?.message || `Successfully Loaded!`, {
      //     // position: toast.POSITION.TOP_CENTER
      //   });
      // }
      // Invalidate queries that depend on this data upon successful fetch
      queryClient.invalidateQueries([endpoint]);
    },
    // enabled: !queryClient.getQueryData([endpoint]), // Disable query if data already exists in the cache
  });
};

export default useGetData;
