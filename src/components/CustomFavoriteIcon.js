import useFavoritesActions from '@/hooks/useFavoritesActions';
import { FolderSpecial } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

export default function CustomFavoriteIcon({ color }) {

    const { push } = useRouter();
    const favorites = useSelector(state => state.favorites?.length);
    const [favorietsInSession, setFavorietsInSession] = useState();
    const {
        getFavoritesFromSession
    } = useFavoritesActions()

    useEffect(() => {
        const products = getFavoritesFromSession();
        if (products.length) {
            setFavorietsInSession(products.length)
        }
    }, [])

    return (
        <Badge color="primary" badgeContent={favorites || favorietsInSession || 0}>
            <FolderSpecial
                color={color}
                onClick={() => push("/favorites")}
                sx={{ fontSize: "1.7rem !important" }}
            />
        </Badge>
    );
}
