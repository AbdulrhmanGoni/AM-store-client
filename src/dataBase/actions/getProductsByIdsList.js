import customFetch from "../../functions/customFetch";

export default async function getProductsByIdsList(productsIds, withCount, query) {
    return await customFetch(`products${query ?? ""}`, "POST", { productsIds, withCount });
}

