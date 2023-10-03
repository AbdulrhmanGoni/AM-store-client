import { useEffect, useState } from "react";
import customFetch from "../functions/customFetch";

export const useFetch = (url, { init, depended, fetchCondition } = {}) => {

    const pass = fetchCondition === undefined ? true : fetchCondition;

    const [data, setData] = useState(init);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [refetched, refetch] = useState(0);
    const [statusCode, setStatusCode] = useState(0);

    useEffect(() => {
        if (pass) {
            setLoading(true);
            customFetch(url)
                .then(setData)
                .catch((err) => {
                    setStatusCode(err?.response?.status)
                    setIsError(true);
                    setError(new Error(err))
                })
                .finally(() => setLoading(false));
        }
    }, [url, refetched, depended]);

    return { data, isError, error, statusCode, isLoading, setData, refetch: () => refetch(v => ++v) };
};