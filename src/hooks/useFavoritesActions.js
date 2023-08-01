import { clearFavorites, toggleFavorites } from "../dataBase/actions/favorites_slice_actions";
import { clearFavorites_localy, toggleFavorites_localy } from "../dataBase/favorites_slice";
import { useSpeedMessage } from "./useSpeedMessage";
import loadingControl from "../dataBase/actions/loadingControl";
import { useDispatch, useSelector } from "react-redux";

export default function useFavoritesActions({ productsState }) {

    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    function removeItem(productId) {
        loadingControl(true);
        toggleFavorites({ userId: userData._id, productId })
            .then(res => {
                toggleFavorites_localy(res);
                productsState(state => state.filter(item => item._id !== res))
            })
            .catch(() => message("remove product failed", "error"))
            .finally(() => { loadingControl(false) })
    }

    function removeAllItems() {
        loadingControl(true);
        clearFavorites(userData._id)
            .then(res => {
                if (res) {
                    dispatch(clearFavorites_localy());
                    productsState(null);
                }
            })
            .catch(() => message("Clearing products failed", "error"))
            .finally(() => { loadingControl(false) })
    }

    return {
        removeItem,
        removeAllItems
    }
}
