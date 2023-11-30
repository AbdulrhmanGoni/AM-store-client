import { useEffect, useState } from "react";
import customFetch from "@/functions/customFetch";

export default function useSlicedFetch(path, options = {}) {

    const {
        defaultSliceSize = 10,
        defaultSliceNumber = 0,
        contentName,
        queryParams,
        itemsIdPropertyName
    } = options;

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [thereIsNoMore, setThereIsNoMore] = useState(false);
    const [sliceNumber, setSliceNumber] = useState(defaultSliceNumber);
    const [newItemsList, setNewItemsList] = useState([]);

    function getNextSlice() {
        !thereIsNoMore && setSliceNumber(state => ++state);
    }

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
            const queries = `${sliceParams}&${queryParams}`;

            setIsLoading(true);
            customFetch(`${path}?${queries}`)
                .then(({ [contentName]: items, thereIsMore }) => {
                    !thereIsMore && setThereIsNoMore(true);
                    if (items?.length) {
                        if (itemsIdPropertyName) {
                            setItems(state => state.concat(items.filter(com => !newItemsList.includes(com[itemsIdPropertyName]))))
                        } else {
                            setItems(state => [...state, ...items])
                        }
                        isError && setIsError(false);
                    }
                })
                .catch(() => setIsError(true))
                .finally(() => { setIsLoading(false) })
        }
    }, [sliceNumber])

    return {
        data: items,
        isError,
        isLoading,
        getNextSlice,
        addNewItem,
        deleteItem
    };
}
