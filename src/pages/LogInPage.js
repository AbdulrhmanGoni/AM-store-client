import {
    Box, Grid, TextField,
    Button, Avatar, Typography
} from '@mui/material/';
import { Login } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loadingControl from '../dataBase/actions/loadingControl';
import { useGoogleAuth } from '@abdulrhmangoni/am-store-library';
import useLogInLogic from '../hooks/useLogInLogic';
import FormsPagesContainer from '../components/FormsPagesContainer';

export function ErrorMessageTag({ messge }) {
    return (
        <Typography sx={{ fontSize: "0.87rem", color: "red", mt: "5px" }}>{messge}</Typography>
    )
}
export default function LogInPage() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { AuthButton } = useGoogleAuth();
    const {
        handleSubmit,
        logInWithGoogle,
        logInWithGoogleFailed,
        thereIsError,
        notValidEmail
    } = useLogInLogic();


    const sxTexFieldOutline = {
        "& fieldset": {
            borderColor: thereIsError || notValidEmail ? "red !important" : "white"
        }
    }

    return (
        <FormsPagesContainer bgImage={require("../images/anonymous-hacker.jpg")}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: "white" }}><Login /></Avatar>
                <Typography component="h1" variant="h5">Log In</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={sxTexFieldOutline}>
                            <TextField
                                fullWidth
                                required
                                name="email"
                                id="email"
                                label="Email Address"
                            />
                            {notValidEmail && <ErrorMessageTag messge="This is invalid email" />}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            {
                                thereIsError &&
                                <ErrorMessageTag messge="There Are Issue in Email Or password, Try Again With More verify" />
                            }
                        </Grid>
                        <Grid item>
                            <Link style={{ textDecoration: "underline" }}>
                                forget your password? change it
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Log In
                    </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography
                            onClick={() => navigate("/sign-up", { replace: true, state })}
                            sx={{ textDecoration: "underline", mb: 2 }}
                        >
                            you dont't have an account? Sign up
                        </Typography>
                    </Grid>
                </Grid>
                <AuthButton
                    onAgree={() => { loadingControl(true) }}
                    onSuccess={logInWithGoogle}
                    onError={logInWithGoogleFailed}
                    text='Log in with Google'
                    mode="light"
                />
            </Box>
        </FormsPagesContainer>
    );
}