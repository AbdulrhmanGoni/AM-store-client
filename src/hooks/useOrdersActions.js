import customFetch from '@/utilities/customFetch';
import { useSelector } from 'react-redux';


export default function useOrdersActions() {

    const { userId, userEmail, avatar } = useSelector(state => state.userData)
    const path = `orders/users`;

    async function addNewOrder(theOrder) {
        return await customFetch(path, "POST", { theOrder, user: { userId, userEmail, avatar } });
    }

    return {
        addNewOrder
    }
}
