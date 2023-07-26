import { useEffect, useState } from "react";
import loadingControl from "../dataBase/actions/loadingControl";
import customFetch from "../functions/customFetch";

export const useAction = (url, method, body, dependent, init) => {

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
        handleLoading(true);
        customFetch(url, method, body)
            .then(setData)
            .catch(setError)
            .finally(() => handleLoading(false));
    }, [url, action, dependent]);

    return { data, isError, isLoading, reAction, actionCount: action };
};