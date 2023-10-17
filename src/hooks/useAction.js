import { useEffect, useState } from "react";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/functions/customFetch";

export const useAction = (path, method, body, { dependent, init, fetchCondition }) => {

    const pass = fetchCondition === undefined ? true : fetchCondition;

    const [data, setData] = useState(init);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);
    const [action, setAction] = useState(1);

    function handleLoading(bool) {
        loadingControl(bool);
        setLoading(bool);
    }

    function reAction() { setAction(a => ++a) }

    useEffect(() => {
        if (!path.match(/undefined/ig) && pass) {
            handleLoading(true);
            customFetch(path, method, body)
                .then(data => {
                    setData(data)
                    isError && setError(null);
                })
                .catch((err) => {
                    setStatusCode(err?.response?.status)
                    setError(new Error(err))
                })
                .finally(() => handleLoading(false));
        }
    }, [path, action, dependent]);

    return { data, isError, isLoading, setData, reAction, actionCount: action };
};