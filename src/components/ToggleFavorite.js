
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorites } from '../dataBase/actions/favorites_slice_actions';
import { Button, CircularProgress } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toggleFavorites_localy } from '../dataBase/favorites_slice';

export default function ToggleFavoriet({ productId, style }) {

    const dispatch = useDispatch();
    const { favorites, userData } = useSelector(state => state);
    const [isInFavorites, setFavoritesState] = useState(false);
    const [loading, setLoading] = useState(false);

    async function toggle() {
        if (userData) {
            setLoading(true);
            await toggleFavorites({ productId, userId: userData._id })
                .then(productId => {
                    if (productId) {
                        dispatch(toggleFavorites_localy(productId));
                    }
                })
            setLoading(false);
        } else {
            dispatch(toggleFavorites_localy(productId));
        }
    }

    useEffect(() => {
        if (favorites) {
            if (favorites.includes(productId)) {
                setFavoritesState(true);
            } else {
                setFavoritesState(false);
            }
        }
    }, [favorites]);


    return (
        <>
            {
                loading ? <CircularProgress color='inherit' size={20} /> :
                    <Button onClick={toggle}
                        sx={{
                            minWidth: { xs: "22px", sm: "25px" }, height: { xs: "22px", sm: "25px" }, p: "4px",
                            "& svg": {
                                width: { xs: "0.9rem", sm: "1.2rem" },
                                height: { xs: "0.9rem", sm: "1.2rem" }
                            }, ...style
                        }}
                        color="error" aria-label="Delete From Shopping Cart" variant={isInFavorites ? "contained" : "outlined"}>
                        {isInFavorites ? <Favorite fontSize='small' /> : <FavoriteBorder fontSize='small' />}
                    </Button>
            }
        </>
    )

}
