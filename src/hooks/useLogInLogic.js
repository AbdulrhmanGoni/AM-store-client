import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSpeedMessage } from "./useSpeedMessage";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "../functions/customFetch";
import isValidEmail from "../functions/isValidEmail";

export default function useLogInLogic() {

    const { message } = useSpeedMessage();
    const [, setCookies] = useCookies();
    const [thereIsError, setErrorState] = useState(false);
    const [notValidEmail, setNotValidEmail] = useState(false);

    function complateLogIn({ userId, accessToken }) {
        let maxAge = 3600 * 24 * 20;
        setCookies("userId", userId, { maxAge });
        setCookies("access-token", accessToken, { maxAge });
        window.location.replace("/");
    }

    async function logInRequest(path, body, emailError) {
        loadingControl(true);
        customFetch(path, "POST", body)
            .then(respons => {
                respons && complateLogIn(respons);
                !respons && emailError(respons);
            })
            .catch(() => { message("There is unexpected error", "error"); })
            .finally(() => { loadingControl(false) })
    }

    async function logInWithGoogle(googleUserAccessToken) {
        logInRequest(
            "log-in/google-auth", { googleUserAccessToken },
            (res) => {
                if (res === false) {
                    message("This email signed up with another sign up method", "warning", 10000)
                } else message("You did not signed up with us before, Sign up first", "error", 10000)
            }
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const
            data = new FormData(event.currentTarget),
            userEmail = data.get('email'),
            userPassword = data.get('password');

        if (validateForm(userEmail)) {
            loadingControl(true)
            logInRequest("log-in", { userEmail, userPassword }, () => { setErrorState(true) })
        }
    };

    function validateForm(email) {
        let isValid = isValidEmail(email)
        !isValid && setNotValidEmail(true)
        return isValid
    }

    return {
        thereIsError,
        notValidEmail,
        handleSubmit,
        logInWithGoogle,
        onLogInWithGoogleFailed: () => {
            message("Logging with Google is failed", "error", 10000)
        }
    }
}
