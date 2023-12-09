import customFetch from "@/functions/customFetch";
import { useState } from "react";

export default function useChangingPasswordRequest() {

    const [changingPasswordRequestLoading, setChangingPasswordRequestLoading] = useState(false);
    const [changingPasswordRequestError, setChangingPasswordRequestError] = useState({ status: true, message: "" });

    function changingPasswordRequest(userEmail, onSuccess) {
        setChangingPasswordRequestLoading(true);
        customFetch(`forget-password?type=changing-password-request`, "POST", { userEmail })
            .then(() => {
                onSuccess()
                !changingPasswordRequestError.status &&
                    setChangingPasswordRequestError({ status: true, message: "" })
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Unexpected error happened"
                setChangingPasswordRequestError({ status: false, message: errorMessage })
            })
            .finally(() => setChangingPasswordRequestLoading(false));
    }

    return {
        changingPasswordRequest,
        changingPasswordRequestLoading,
        changingPasswordRequestError: !changingPasswordRequestError.status,
        changingPasswordRequestErrorMessage: changingPasswordRequestError.message,
        setChangingPasswordRequestError
    }
}
