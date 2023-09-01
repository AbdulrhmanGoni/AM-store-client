import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import PageWidthBG from '../components/PageWidthBG';
import { setUserData } from '../dataBase/userData_slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setFavorites } from '../dataBase/actions/favorites_slice_actions';
import { setShoppingCart } from '../dataBase/actions/shoppingCart_slice_actions';
import isValidEmail from '../functions/isValidEmail';
import loadingControl from '../dataBase/actions/loadingControl';
import { useCookies } from 'react-cookie';
import customFetch from '../functions/customFetch';
import { useSpeedMessage } from '../hooks/useSpeedMessage';


export default function SignUpPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = useSpeedMessage();
    const { state } = useLocation();
    const [, setCookies] = useCookies();
    const { favorites, shoppingCart } = useSelector(state => state);
    const [nameState, setNameState] = useState(true);
    const [passwordState, setPasswordState] = useState(true);
    const [emailState, setEmailState] = useState({ state: true, msg: null });


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
        if (password1 === password2) {
            setPasswordState(true);
            return password1;
        } else {
            setPasswordState(false);
            return false;
        }
    }

    async function complateSingUp({ userData, token }) {
        const { _id, userEmail, userName, avatar } = userData;
        let maxAge = 3600 * 24 * 20;
        setCookies("userId", _id, { maxAge });
        setCookies("access-token", token, { maxAge });
        dispatch(setUserData({ _id, userEmail, userName, avatar }));
        shoppingCart && shoppingCart.length && await setShoppingCart({ shoppingCart, userId: _id })
        favorites && favorites.length && await setFavorites({ favorites, userId: _id })
        navigate(`/${state ?? ""}`, { replace: true });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userName = userNameValidate(data.get('userName'));
        const userEmail = emailValidate(data.get('email'));
        const userPassword = passwordValidate(data.get('password'), data.get('verifyPassword'));

        if (userName && userEmail && userPassword) {
            const newUser = { userName, userEmail, userPassword };
            loadingControl(true);
            customFetch(`sign-up`, "POST", newUser)
                .then(data => {
                    if (data) complateSingUp(data);
                    else setEmailState({ state: false, msg: "This Email Is Already Used" });
                })
                .catch(() => { message("There is unexpected error", "error"); })
                .finally(() => { loadingControl(false); })
        }
    };

    const bgImage = require("../images/dream-blue.jpg");

    return (
        <PageWidthBG bgImage={bgImage}>
            <Container className='customForm' component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ "& input": { color: nameState ? "white" : "#d32f2f !important" } }}
                                    error={!nameState}
                                    autoComplete="given-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                />
                                {!nameState && <small style={{ color: "red" }}>name must be longer than 6 characters</small>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!emailState.state}
                                    sx={{ "& input": { color: emailState.state ? "white" : "#d32f2f !important" } }}
                                    required
                                    fullWidth
                                    variant='outlined'
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                                {!emailState.state && <small style={{ color: "red" }}>{emailState.msg}</small>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!passwordState}
                                    sx={{ "& input": { color: passwordState ? "white" : "#d32f2f !important" } }}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                                {!passwordState && <small style={{ color: "red" }}>The Tow Passwords Must Be The Seam</small>}

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!passwordState}
                                    sx={{ "& input": { color: passwordState ? "white" : "#d32f2f !important" } }}
                                    required
                                    fullWidth
                                    name="verifyPassword"
                                    label="Enter Password Again"
                                    type="password"
                                    id="verifyPassword"
                                    autoComplete="verify-password"
                                />
                                {!passwordState && <small style={{ color: "red" }}>The Tow Passwords Must Be The Seam</small>}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox name='allowExtraEmails' id='allowExtraEmails' value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Typography onClick={() => navigate("/log-in", { replace: true, state })} style={{ textDecoration: "underline" }}>
                                    Already have an account? Sign in
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </PageWidthBG>
    );
}

