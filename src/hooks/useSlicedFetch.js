import { useEffect, useState } from "react";
import customFetch from "@/functions/customFetch";

export default function useSlicedFetch(path, options = {}) {

    const {
        defaultSliceSize = 10,
        defaultSliceNumber = 0,
        contentName,
        queryParams,
        itemsIdPropertyName,
        autoFetchingFirstSlice
    } = options;

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [thereIsNoMore, setThereIsNoMore] = useState(false);
    const [sliceNumber, setSliceNumber] = useState(defaultSliceNumber);
    const [newItemsList, setNewItemsList] = useState([]);

    function getNextSlice() { !thereIsNoMore && setSliceNumber(state => ++state); }

    function addNewItem(item, itemId) {
        setItems(state => [item, ...state]);
        itemId && setNewItemsList(state => [itemId, ...state]);
    }

    function deleteItem(itemId, itemsIdPropertyName) {
        setItems(state => {
            if (itemsIdPropertyName) {
                return state.filter(item => item[itemsIdPropertyName] !== itemId)
            } else {
                return state.filter(item => item.id !== itemId)
            }
        })
    }

    useEffect(() => {
        if (sliceNumber && !thereIsNoMore) {
            const sliceParams = `sliceNumber=${sliceNumber}&sliceSize=${defaultSliceSize}`;
            const queries = `${queryParams}&${sliceParams}`;

            setIsLoading(true);
            customFetch(`${path}?${queries}`)
                .then(({ [contentName]: items, thereIsMore }) => {
                    if (items?.length) {
                        if (itemsIdPropertyName) {
                            setItems(state => state.concat(items.filter(com => !newItemsList.includes(com[itemsIdPropertyName]))))
                        } else {
                            setItems(state => [...state, ...items])
                        }
                    }
                    !thereIsMore && setThereIsNoMore(true);
                    !isSuccess && setIsSuccess(true);
                    isError && setIsError(false);
                })
                .catch(() => {
                    isSuccess && setIsSuccess(false);
                    !isError && setIsError(true);
                })
                .finally(() => { setIsLoading(false) })
        }
    }, [sliceNumber])

    useEffect(() => { autoFetchingFirstSlice && setSliceNumber(1) }, []);

    return {
        data: items,
        isError,
        isLoading,
        isSuccess,
        getNextSlice,
        addNewItem,
        deleteItem
    };
}
