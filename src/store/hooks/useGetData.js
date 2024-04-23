import { useState, useEffect } from 'react';
import { BACKEND_API } from "../utils/API";
import { toast } from 'react-toastify';

const cachedData = {}; // Cache to store fetched data

const fetchData = async (endpoint) => {
  try {
    const response = await BACKEND_API.get(endpoint);
    if (response.status === 200 || response.status === 201) {
      toast.success(response?.data?.message || `Successfully Loaded!`, {
        // position: toast.POSITION.TOP_CENTER
      });
      // return response.data;
    }
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint}.`);
  }
};

const useGetData = (endpoint) => {
  const [data, setData] = useState(cachedData[endpoint] || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndCache = async () => {
      if (!cachedData[endpoint]) {
        setLoading(true);
        try {
          const newData = await fetchData(endpoint);
          setData(newData);
          cachedData[endpoint] = newData; // Cache the fetched data
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDataAndCache();

    return () => {
      // Cleanup function to clear cached data when component unmounts
      delete cachedData[endpoint];
    };
  }, [endpoint]); // Re-fetch data whenever endpoint changes

  return { data, loading, error };
};

export default useGetData;
