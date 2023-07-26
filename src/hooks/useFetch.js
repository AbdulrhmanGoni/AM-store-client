import { useEffect, useState } from "react";
import headersRequest from "../CONSTANT/headersRequest";

export const useFetch = (url, init) => {

    const [data, setData] = useState(init);
    const [isError, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [refetched, refetch] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(url, headersRequest())
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url, refetched]);

    return { data, isError, isLoading, setData, refetch: () => refetch(v => ++v) };
};