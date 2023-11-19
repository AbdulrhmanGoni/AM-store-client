import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/functions/customFetch";
import { useSelector } from 'react-redux';


export default function useUserDataActions() {

    const userId = useSelector(state => state.userData?._id);
    const path = `users/${userId}`;

    const changeUserName = async (newName) => {
        loadingControl(true);
        const userData = await customFetch(path, "POST", { newName, type: "changeUserName" });
        loadingControl(false);
        return userData;
    }

    const changeUserPassword = async ({ currentPassword, newPassword }) => {
        return await customFetch(path, "POST", { currentPassword, newPassword, type: "changeUserPassword" })
    }

    const passwordChecker = async (password) => await customFetch(path + '/password', "POST", { password });

    return {
        changeUserName,
        changeUserPassword,
        passwordChecker
    }
}
