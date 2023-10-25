export function applyDiscount(price, discount) {
    if (discount) return price - price * discount;
    else return price;
}

export function findOriginalPrice(discountedPrice, discountPercentage) {
    const originalPrice = discountedPrice / (1 - discountPercentage / 100);
    return originalPrice;
}