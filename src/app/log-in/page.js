"use client"
import {
    Box, Grid, TextField,
    Button, Avatar, Typography
} from '@mui/material/';
import { Login } from '@mui/icons-material';
import Link from 'next/link';
import { useGoogleAuth, loadingControl } from '@abdulrhmangoni/am-store-library';
import useLogInLogic from '@/hooks/useLogInLogic';
import FormsPagesContainer from '@/components/FormsPagesContainer';
import ErrorMessageTag from '@/components/ErrorMessageTag';


export default function LogInPage() {

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
        <FormsPagesContainer bgImage={"./sky2.jpg"}>
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
                                name="email"
                                id="email"
                                label="Email Address"
                            />
                            {notValidEmail && <ErrorMessageTag messge="This is invalid email" />}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            {
                                thereIsError &&
                                <ErrorMessageTag messge="There is issue in email Or password, Try again with more verifying" />
                            }
                        </Grid>
                        <Grid item>
                            <Link href={"change-password"} style={{ textDecoration: "underline" }}>
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
                <Link
                    replace
                    href="/sign-up"
                    style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
                >
                    <Typography sx={{ textDecoration: "underline", mb: 2 }}>
                        you don&apos;t have an account? Sign up
                    </Typography>
                </Link>
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

export const metadata = {
    title: "Log in to AM Store"
}