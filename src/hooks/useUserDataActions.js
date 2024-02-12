import customFetch from "@/utilities/customFetch";
import { useSelector } from 'react-redux';


export default function useUserDataActions() {

    const userId = useSelector(state => state.userData?._id);
    const path = (route) => `users/${userId}/${route}`;

    const changeUserName = async (newName) => {
        return await customFetch(path(""), "PATCH", { newName });
    }

    const changeUserPassword = async ({ currentPassword, newPassword }) => {
        return await customFetch(path("change-password"), "POST", { currentPassword, newPassword })
    }

    const passwordChecker = async (password) => {
        return await customFetch(path('check-password'), "POST", { password });
    }

    return {
        changeUserName,
        changeUserPassword,
        passwordChecker
    }
}
