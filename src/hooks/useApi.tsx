import React, { useCallback, useEffect, useState } from "react";

interface UseApiProps {
  method: "GET" | "POST";
  url: string;
}
interface UseApiResponse<T, B> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  apiCall: (body?: B) => Promise<void>; //this parameter is optional,can call apiCall with or without an argument.
}
//This allows useApi to be flexible in handling both types of requests: those that require a request body (like POST requests) and those that do not (like GET requests).
function useApi<T, B = undefined>({
  method = "GET",
  url,
}: UseApiProps): UseApiResponse<T, B> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiCall = async (requestBody?: B): Promise<void> => {
    console.log(`API Is called with method: ${method}`);
    setIsLoading(true);

    try {
      const requestOptions: RequestInit = {};
      if (method === "POST" && requestBody) {
        requestOptions.body = JSON.stringify(requestBody);
        requestOptions.headers = {
          "Content-Type": "application/json",
        };
        console.log("Request Body:", requestOptions);
      }
      const response = await fetch(url, { method, ...requestOptions });
      // console.log("Response Status:", response.status);
      if (!response.ok) {
        throw new Error("Error: ${response.statusText}");
      }
      const responseData = await response.json();
      setData(responseData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (method === "GET") apiCall();
  }, [url, method]);

  return { data, error, isLoading, apiCall };
}
export default useApi;
