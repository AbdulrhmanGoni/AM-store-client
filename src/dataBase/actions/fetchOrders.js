import customFetch from "../../functions/customFetch";
import loadingControl from "./loadingControl";

export async function fetchOrderById(orderId) {
    loadingControl(true);
    const data = await customFetch(`orders/${orderId}`);
    loadingControl(false);
    return data;
}