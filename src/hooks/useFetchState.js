import { useEffect, useState } from 'react'

export default function useFetchState(initialState) {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isFulfilled, setFulfilled] = useState(false);

    function setState(state) {
        switch (state) {
            case "loading":
                setLoading(true);
                setError(false);
                setFulfilled(false);
                break;

            case "error":
                setLoading(false);
                setError(true);
                setFulfilled(false);
                break;

            case "fulfilled":
                setLoading(false);
                setError(false);
                setFulfilled(true);
                break;

            default:
                setLoading(false);
                setError(false);
                setFulfilled(false);
                break;
        }
    }

    useEffect(() => {
        setState(initialState);
    }, []);

    return { isLoading, isError, isFulfilled, setState }
}
