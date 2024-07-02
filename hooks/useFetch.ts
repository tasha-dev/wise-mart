// Codes by mahdi tasha
// Importing part
import {useFetchType} from "@/types/hooks";
import {useEffect, useState} from "react";

// Creating and exporting useFetch custom hook as default
export default function useFetch<T>({url}:useFetchType):{
    loading: boolean,
    error: undefined | Error,
    data: T | undefined,
    refresh: () => void
} {
    // Defining states
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<undefined | Error>(undefined);
    const [data, setData] = useState<T | undefined>(undefined);
    const [count, setCount] = useState<number>(0);

    // Using useEffect to fetch data
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(data => data.json())
            .then((data) => {
                setLoading(false);
                setData(data);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            })
    }, [count]);

    // Returning part
    return {
        loading,
        error,
        data,
        refresh: () => setCount(prevState => prevState + 1)
    };
}