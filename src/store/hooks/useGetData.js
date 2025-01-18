
import { useQuery, useQueryClient } from 'react-query';
import { BACKEND_API } from "../utils/API";
import { toast } from 'react-toastify';

const fetchData = async (endpoint) => {

  try {
    const response = await BACKEND_API.get(endpoint);
    // console.log("data", response.data)
    if (response.status === 200 || response.status === 201) {
      // toast.success(response?.data?.message || `Successfully Loaded!`, {
        // position: toast.POSITION.TOP_CENTER
      // });
      return response.data;
    }

    // return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error...", {
      // position: toast.POSITION.TOP_CENTER
    });
    // throw error?.response?.data;
  }
};

const useGetData = (endpoint) => {
  const queryClient = useQueryClient(); // Access queryClient

  return useQuery([endpoint], () => fetchData(endpoint), {
    onSuccess: (endpoint) => {
      // Invalidate queries that depend on this data upon successful fetch
      queryClient.invalidateQueries([endpoint]);
    },
  });
};

export default useGetData;

