import { useQuery, useQueryClient } from "react-query";
import { BACKEND_API } from "../utils/API";

const fetchData = async (queryParams) => {
  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined) // Exclude undefined values
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&");

  // const endpoint = `/api/v1/airport-books?${queryString}`;
  const endpoint = `/api/v1/airport-books?page=1&pageSize=1000&sortDirection=ASC`;

  try {
    const response = await BACKEND_API.get(endpoint);
    // console.log("book data: ", response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint}.`);
  }
};

const useGetData12 = (queryParams) => {
  const queryClient = useQueryClient(); // Access queryClient

  return useQuery(
    ["getData"],
    async () => {
      try {
        const data = await fetchData(queryParams);
        return data;
      } catch (error) {
        throw new Error(`Failed to fetch data.`);
      }
    },
    {
      onSuccess: () => {
        // Invalidate queries that depend on this data upon successful fetch
        queryClient.invalidateQueries(["getData"]);
      },
    }
  );
};
export default useGetData12;
