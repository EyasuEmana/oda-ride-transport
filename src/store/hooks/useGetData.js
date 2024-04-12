import { useQuery, useQueryClient } from 'react-query';
import { BACKEND_API } from "../utils/API";

const fetchData = async (endpoint) => {


  try {
    const response = await BACKEND_API.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint}.`);
  }
};

const useGetData = (endpoint) => {
  const queryClient = useQueryClient(); // Access queryClient

  return useQuery([endpoint], () => fetchData(endpoint), {
    onSuccess: () => {
      // Invalidate queries that depend on this data upon successful fetch
      queryClient.invalidateQueries([endpoint]);
    },
  });
};

export default useGetData;
