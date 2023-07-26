import customFetch from "../../functions/customFetch";

export default async function rateProduct({ rate }) {
    return await customFetch(`products/${rate.productId}/rating`, "POST", rate)
}