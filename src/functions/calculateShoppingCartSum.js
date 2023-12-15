import { applyDiscount } from "@abdulrhmangoni/am-store-library";

export default function calculateShoppingCartSum(shoppingCart) {
    return shoppingCart.reduce((acc, current) => {
        const productPrice = current.price * current.count
        if (current.discount) return acc + applyDiscount(productPrice, current.discount);
        else return acc + productPrice;
    }, 0)
}
