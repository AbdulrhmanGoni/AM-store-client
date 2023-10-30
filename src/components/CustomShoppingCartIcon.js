import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CustomShoppingCartIcon({ color }) {
    const { push } = useRouter();
    const shoppingCart = useSelector(state => state.shoppingCart);
    const [count, setCount] = useState(0);

    useEffect(() => { shoppingCart && setCount(shoppingCart.length) }, [shoppingCart]);

    return (
        <Badge color="primary" badgeContent={count}>
            <ShoppingCart
                color={color}
                onClick={() =>
                    push("/shopping-cart")}
                sx={{ fontSize: "1.7rem !important" }}
            />
        </Badge>
    );
}
