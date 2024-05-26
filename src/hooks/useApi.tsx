import React, { useCallback, useEffect, useState } from 'react';

interface UseApiProps {
    method: 'GET' | 'POST';
    url: string
}
interface UseApiResponse<T> {
    data: T | null;
    error: string | null;
    isLoading: boolean;
    apiCall: () => void; //function signature. It's not an arrow function
}
// interface ApiService {
//     apiCall: () => Promise<UseApiResponse<T>>
// }

    function useApi<T>  ({ method = 'GET', url} : UseApiProps) : UseApiResponse<T> {
    const [data, setData] = useState<T | null> (null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const apiCall = async () => {
        setIsLoading(true);
        try {
            const response = await fetch (url, { method });
            if(!response.ok) {
                throw new Error('Error: ${response.statusText}')
            }
            const responseData = await response.json();
            setData(responseData);
            setError(null);
        }
        catch (error: any) {
            setError(error.message || 'Ajke mood bhalo nai')
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        apiCall();
    }, [url, method])

    return { data, error, isLoading, apiCall}
}
export default useApi;