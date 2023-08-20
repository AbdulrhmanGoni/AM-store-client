import customFetch from '../../functions/customFetch';
import loadingControl from "./loadingControl";

const path = (id, orderId) => `users/${id}/orders/${orderId ?? ""}`;

export async function fetchOrderById(orderId, userId) {
    loadingControl(true);
    const data = await customFetch(path(userId, orderId));
    loadingControl(false);
    return data;
}

export async function addNewOrder({ theOrder, userId }) {
    return await customFetch(path(userId), "POST", { theOrder, userId });
}

