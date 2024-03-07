"use client"
import { Box, Grid, TextField, Paper, Button, Avatar } from '@mui/material/';
import { Login } from '@mui/icons-material';
import Link from 'next/link';
import { useGoogleAuth, P } from '@abdulrhmangoni/am-store-library';
import useLogInLogic from '@/hooks/useLogInLogic';
import FormsPagesContainer from '@/components/FormsPagesContainer';
import ErrorMessageTag from '@/components/ErrorMessageTag';
import pagesSpaces from '@/CONSTANTS/pagesSpaces';


export default function LogInPage() {

    const { AuthButton } = useGoogleAuth({ clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID });
    const {
        handleSubmit,
        logInWithGoogle,
        onLogInWithGoogleFailed,
        emailOrPasswordErrorMessage,
        emailOrPasswordError
    } = useLogInLogic();

    return (
        <FormsPagesContainer bgImage={"./sky2.jpg"}>
            <Paper
                className="flex-column-center"
                sx={{ p: pagesSpaces, bgcolor: "transparent" }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: "white" }}><Login /></Avatar>
                <P component="h1" variant="h5">Log In</P>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="email"
                                id="email"
                                label="Email Address"
                                error={emailOrPasswordError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder='Enter your password here'
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                error={emailOrPasswordError}
                            />
                            {emailOrPasswordError && <ErrorMessageTag messge={emailOrPasswordErrorMessage} />}
                        </Grid>
                        <Grid item>
                            <Link href="/forget-password" style={{ textDecoration: "underline" }}>
                                Forget your password? Reset it
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
                    <P sx={{ textDecoration: "underline", mb: 2 }}>
                        You don&apos;t have an account? Sign up
                    </P>
                </Link>
                <AuthButton
                    onSuccess={logInWithGoogle}
                    onError={onLogInWithGoogleFailed}
                    text='Log in with Google'
                    mode="light"
                />
            </Paper>
        </FormsPagesContainer>
    );
}