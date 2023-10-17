import { useState } from 'react'
import isValidEmail from '@/functions/isValidEmail';
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from '@/functions/customFetch';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUserData } from '@/dataBase/userData_slice';
import { setShoppingCart } from '@/dataBase/actions/shoppingCart_slice_actions';
import { setFavorites } from '@/dataBase/actions/favorites_slice_actions';
import { useSpeedMessage } from './useSpeedMessage';
import { useRouter } from 'next/navigation';


export default function useSignUpLogic() {

    const { message } = useSpeedMessage();
    // const { back } = useRouter();
    const dispatch = useDispatch();
    const [nameState, setNameState] = useState(true);
    const [passwordState, setPasswordState] = useState({ state: true, msg: "" });
    const [emailState, setEmailState] = useState({ state: true, msg: "" });
    const [, setCookies] = useCookies();
    const shoppingCart = useSelector(state => state.shoppingCart);
    const favorites = useSelector(state => state.favorites);


    function userNameValidate(name) {
        if (name.length > 5) {
            setNameState(true);
            return name;
        } else {
            setNameState(false);
            return false;
        }
    }

    function emailValidate(email) {
        if (isValidEmail(email)) {
            setEmailState({ state: true, msg: null });
            return email;
        } else {
            setEmailState({ state: false, msg: "The Email Is Not Valid" });
            return false;
        }

    }

    function passwordValidate(password1, password2) {
        let msg = "The two passwords must be "
        let toShortMsg = msg + "longer than 5 characters"
        let toShort = password1.length < 6
        let notSimilarMsg = msg + "similar"
        let notSimilar = password1 !== password2
        let thereIsError = toShort || notSimilar
        setPasswordState({
            state: thereIsError ? false : true,
            msg: toShort ? toShortMsg : notSimilar ? notSimilarMsg : ""
        });
        return thereIsError ? false : password1
    }

    function signUpRequest(path, newUser, emailErr) {
        customFetch(path, "POST", newUser)
            .then(data => {
                if (data) complateSingUp(data);
                else emailErr()
            })
            .catch(() => { message("There is unexpected error", "error"); })
            .finally(() => { loadingControl(false); })
    }

    async function signWithGoogle(userInfo) {
        const newUser = {
            userEmail: userInfo.email,
            avatar: userInfo.picture,
            userName: userInfo.name,
        }

        userInfo.email_verified &&
            signUpRequest(
                "sign-up/google-auth",
                newUser,
                () => { message("Your email already registred", "warning", 10000) }
            )
    }

    async function complateSingUp({ userData, token }) {
        const userId = userData._id;
        let maxAge = 3600 * 24 * 20;
        setCookies("userId", userId, { maxAge });
        setCookies("access-token", token, { maxAge });
        dispatch(setUserData({ userData, state: true }));
        shoppingCart && shoppingCart.length && await setShoppingCart({ shoppingCart, userId })
        favorites && favorites.length && await setFavorites({ favorites, userId })
        window.location.replace("/");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userName = userNameValidate(data.get('userName'));
        const userEmail = emailValidate(data.get('email'));
        const userPassword = passwordValidate(data.get('password'), data.get('verifyPassword'));

        if (userName && userEmail && userPassword) {
            loadingControl(true);
            signUpRequest(
                "sign-up",
                { userName, userEmail, userPassword },
                () => { setEmailState({ state: false, msg: "This Email Is Already Used" }) }
            )
        }
    };

    return {
        passwordState,
        nameState,
        emailState,
        handleSubmit,
        signWithGoogle,
        signWithGoogleFailed: () => { message("Signing with Google Failed", "error") },
    }
}
