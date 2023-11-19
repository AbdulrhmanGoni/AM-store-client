import { useState } from 'react'
import isValidEmail from '@/functions/isValidEmail';
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from '@/functions/customFetch';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUserData } from '@/dataBase/userData_slice';
import { useSpeedMessage } from './useSpeedMessage';
import useFavoritesActions from './useFavoritesActions';
import useShoppingCartActions from './useShoppingCartActions';


export default function useSignUpLogic() {

    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const { setShoppingCart } = useShoppingCartActions();
    const { setFavorites } = useFavoritesActions();
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

    function signUpRequest(path, newUser) {
        customFetch(path, "POST", newUser)
            .then(res => {
                if (res.ok) complateSingUp(res.payload);
                else {
                    message(res.message, "warning");
                    setEmailState({ state: false, msg: res.message ?? "There is unexpected error" })
                }
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
        userInfo.email_verified && signUpRequest("sign-up/google-auth", newUser)
    }

    async function complateSingUp({ userData, token }) {
        const userId = userData._id;
        let maxAge = 3600 * 24 * 20;
        setCookies("userId", userId, { maxAge });
        setCookies("access-token", token, { maxAge });
        dispatch(setUserData({ userData, state: true }));
        shoppingCart && shoppingCart.length && await setShoppingCart(shoppingCart);
        favorites && favorites.length && await setFavorites(favorites);
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
            signUpRequest("sign-up", { userName, userEmail, userPassword })
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
