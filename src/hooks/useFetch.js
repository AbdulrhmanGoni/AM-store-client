import { useEffect, useState } from "react";
import customFetch from "../functions/customFetch";

export const useFetch = (url, init) => {

    const [data, setData] = useState(init);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [refetched, refetch] = useState(0);

    useEffect(() => {
        setLoading(true);
        customFetch(url)
            .then(setData)
            .catch((err) => { setIsError(true); setError(new Error(err)) })
            .finally(() => setLoading(false));
    }, [url, refetched]);

    return { data, isError, error, isLoading, setData, refetch: () => refetch(v => ++v) };
};