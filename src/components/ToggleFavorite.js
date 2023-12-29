import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toggleFavorites_localy } from '../state-management/favorites_slice';
import useFavoritesActions from '@/hooks/useFavoritesActions';

export default function ToggleFavoriet({ productId, style }) {

    const dispatch = useDispatch();
    const { toggleFavorites } = useFavoritesActions();
    const favorites = useSelector(state => state.favorites);
    const userData = useSelector(state => state.userData);
    const [isInFavorites, setFavoritesState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function toggle() {
        if (userData) {
            setLoading(true);
            toggleFavorites(productId)
                .then(() => dispatch(toggleFavorites_localy(productId)))
                .catch(() => {
                    setError(true);
                    setTimeout(() => setError(false), 3000);
                })
                .finally(() => setLoading(false))

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
    }, [favorites, productId]);


    return (
        <>
            {
                loading ? <CircularProgress color='inherit' size={20} /> :
                    <Tooltip title="Failed to add the product to favorites" open={error}>
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
                    </Tooltip>
            }
        </>
    )

}
