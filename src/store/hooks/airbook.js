import { useQuery, useQueryClient } from "react-query";
import { BACKEND_API } from "../utils/API";
import { toast } from "react-toastify";

const fetchData = async (endpoint) => {
  try {
    const response = await BACKEND_API.get(endpoint);
    // console.log("data", response.data)
    if (response.status === 200 || response.status === 201) {
      return {
        data: response.data.data,
        pageNumber: response.data.pageNumber,
        pageSize: response.data.pageSize,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
      };
    }

    // return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || " Network error...", {
    });
  }
};

const useGetData = (endpoint) => {
  const queryClient = useQueryClient(); // Access queryClient

  return useQuery([endpoint], () => fetchData(endpoint), {
    onSuccess: (endpoint) => {
      queryClient.invalidateQueries([endpoint]);
    },
  });
};

export default useGetData;
