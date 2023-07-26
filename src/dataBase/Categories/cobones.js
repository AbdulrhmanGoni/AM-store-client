export function applyDiscount(price, discount) {
    if (discount) return price - price * discount;
    else return price;
}

export function discountDecorator(cobone) {

    if (cobone) {
        return `${String(cobone.toFixed(2)).slice(2)}%`
    } else return 0
}