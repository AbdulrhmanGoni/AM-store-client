import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSpeedMessage } from "./useSpeedMessage";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "../functions/customFetch";
import isValidEmail from "../functions/isValidEmail";
// import { useRouter } from "next/navigation";


export default function useLogInLogic() {

    // const { back } = useRouter();
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

    async function logInRequest(path, { userPassword, userEmail }, emailError) {
        customFetch(path, "POST", { userPassword, userEmail })
            .then(respons => {
                respons && complateLogIn(respons);
                !respons && emailError(respons);
            })
            .catch(() => { message("There is unexpected error", "error"); })
            .finally(() => { loadingControl(false) })
    }

    async function logInWithGoogle(userInfo) {
        userInfo.email_verified &&
            logInRequest(
                "log-in/google-auth", { userEmail: userInfo.email },
                (res) => {
                    if (res === false) {
                        message("This email signed up with another sign up method", "warning", 10000)
                    } else message("You did not create an account before, Sign up first", "error", 10000)
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
        logInWithGoogleFailed: () => {
            message("Logging with Google is failed", "error", 10000)
        }
    }
}
