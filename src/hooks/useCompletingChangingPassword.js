import customFetch from "@/functions/customFetch";
import { useState } from "react";
import { useSpeedMessage } from "./useSpeedMessage";

export default function useCompletingChangingPassword() {

    const { message } = useSpeedMessage();
    const [newPasswordFieldStatus, setNewPasswordFieldStatus] = useState({ status: true, message: "" });
    const [isLodading, setIsLodading] = useState(false);
    const [changePasswordToken, setChangePasswordToken] = useState("");

    function completingChangingPassword(payload, onSuccess, onFailed) {
        setIsLodading(true);
        customFetch("forget-password?type=changing-the-password", "POST", { ...payload, changePasswordToken })
            .then(() => {
                onSuccess();
                setNewPasswordFieldStatus({ message: "", status: true });
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Unexpected error happened";
                const changingPasswordTokenExpired = error.response?.data?.changingPasswordTokenExpired || false;
                if (changingPasswordTokenExpired) {
                    onFailed();
                    message(errorMessage, "error", 10000);
                } else {
                    setNewPasswordFieldStatus({ message: errorMessage, status: false });
                }
            })
            .finally(() => setIsLodading(false));
    }

    return {
        completingChangingPassword,
        setNewPasswordFieldStatus,
        setChangePasswordToken,
        changingPasswordLoading: isLodading,
        newPasswordFieldMessage: newPasswordFieldStatus.message,
        newPasswordFieldError: !newPasswordFieldStatus.status,
    }
}
