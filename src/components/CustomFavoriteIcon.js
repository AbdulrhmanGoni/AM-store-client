import { FolderSpecial } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CustomFavoriteIcon({ color }) {
    const { push } = useRouter();
    const favorites = useSelector(state => state.favorites);

    return (
        <Badge color="primary" badgeContent={favorites ? favorites.length : 0}>
            <FolderSpecial
                color={color}
                onClick={() => push("/favorites")}
                sx={{ fontSize: "1.7rem !important" }}
            />
        </Badge>
    );
}
