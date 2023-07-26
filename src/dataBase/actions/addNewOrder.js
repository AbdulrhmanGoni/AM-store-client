import customFetch from '../../functions/customFetch';

export default async function addNewOrder({ theOrder, userId }) {
    return await customFetch(`orders`, "POST", { theOrder, userId });
}
