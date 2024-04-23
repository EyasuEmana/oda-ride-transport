import { useQuery, useQueryClient } from "react-query";
import { BACKEND_API } from "../utils/API";

const fetchData = async (endpoint) => {
  try {
    const response = await BACKEND_API.get(endpoint);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint}.`);
  }
};

const useGetData12 = (endpoint) => {
  const queryClient = useQueryClient(); // Access queryClient

  return useQuery(
    ["getData", endpoint], // Unique key for this query
    async () => {
      try {
        const data = await fetchData(endpoint);
        return data;
      } catch (error) {
        throw new Error(`Failed to fetch data.`);
      }
    },
    {
      onSuccess: () => {
        // Invalidate queries that depend on this data upon successful fetch
        queryClient.invalidateQueries(["getData", endpoint]);
      },
    }
  );
};

export default useGetData12;
