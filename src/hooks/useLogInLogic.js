import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSpeedMessage } from "./useSpeedMessage";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "../functions/customFetch";
import isValidEmail from "../functions/isValidEmail";

export default function useLogInLogic() {

    const { message } = useSpeedMessage();
    const [, setCookies] = useCookies();
    const [errorState, setErrorState] = useState({ status: true, message: "" });

    function complateLogIn({ userId, accessToken }) {
        let maxAge = 3600 * 24 * 20;
        setCookies("userId", userId, { maxAge });
        setCookies("access-token", accessToken, { maxAge });
        window.location.replace("/");
    }

    async function logInRequest(path, body, isFiledError) {
        loadingControl(true);
        customFetch(path, "POST", body)
            .then((response) => { complateLogIn(response) })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "There is unexpected error";
                if (isFiledError) setErrorState({ message: errorMessage, status: false });
                else message(errorMessage, "error", 10000);
            })
            .finally(() => loadingControl(false))
    }

    async function logInWithGoogle(googleUserAccessToken) {
        logInRequest("log-in/google-auth", { googleUserAccessToken })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const
            data = new FormData(event.currentTarget),
            userEmail = data.get('email'),
            userPassword = data.get('password');

        if (validateForm(userEmail)) {
            loadingControl(true)
            logInRequest("log-in", { userEmail, userPassword }, true)
        }
    };

    function validateForm(email) {
        let isValid = isValidEmail(email)
        !isValid && setErrorState({ message: "You entered an invalid email", status: false })
        return isValid
    }

    return {
        handleSubmit,
        logInWithGoogle,
        onLogInWithGoogleFailed: () => {
            message("Logging with Google is failed", "error", 10000)
        },
        emailOrPasswordErrorMessage: errorState.message,
        emailOrPasswordError: !errorState.status
    }
}
