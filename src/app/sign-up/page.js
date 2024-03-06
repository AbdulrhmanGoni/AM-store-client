"use client"
import { Box, Grid, Paper, TextField, Button, Avatar } from '@mui/material/';
import { PersonAddAlt1 } from '@mui/icons-material';
import useSignUpLogic from '@/hooks/useSignUpLogic';
import { useGoogleAuth, P } from '@abdulrhmangoni/am-store-library';
import FormsPagesContainer from '@/components/FormsPagesContainer';
import ErrorMessageTag from '@/components/ErrorMessageTag';
import Link from 'next/link';
import pagesSpaces from '@/CONSTANTS/pagesSpaces';


export default function SignUpPage() {

    const { AuthButton } = useGoogleAuth({ clientId: process.env.REACT_APP_CLIENT_ID });
    const {
        emailState,
        passwordState,
        nameState,
        handleSubmit,
        signUpWithGoogle,
        onSignedUpFailed
    } = useSignUpLogic();

    return (
        <FormsPagesContainer bgImage={"./sky1.jpg"}>
            <Paper
                className='flex-column-center'
                sx={{
                    mt: 8,
                    bgcolor: "transparent",
                    p: pagesSpaces
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: "white" }}><PersonAddAlt1 /></Avatar>
                <P component="h1" variant="h5">Sign up</P>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                sx={colorCondition(nameState)}
                                error={!nameState}
                                autoComplete="given-name"
                                name="userName"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                autoFocus
                            />
                            {!nameState && <ErrorMessageTag messge="name must be longer than 6 characters" />}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!emailState.state}
                                sx={colorCondition(emailState.state)}
                                required
                                fullWidth
                                variant='outlined'
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            {!emailState.state && <ErrorMessageTag messge={emailState.msg} />}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!passwordState.state}
                                sx={colorCondition(passwordState.state)}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                            {!passwordState.state && <ErrorMessageTag messge={passwordState.msg} />}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!passwordState.state}
                                sx={colorCondition(passwordState.state)}
                                fullWidth
                                name="verifyPassword"
                                label="Enter Password Again"
                                type="password"
                                id="verifyPassword"
                                autoComplete="verify-password"
                            />
                            {!passwordState.state && <ErrorMessageTag messge={passwordState.msg} />}
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Link
                        replace
                        href="/log-in"
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            margin: "12px 0px",
                            width: "100%"
                        }}
                    >
                        <P textDecoration="underline">
                            Already have an account? Log in
                        </P>
                    </Link>
                    <AuthButton
                        onSuccess={signUpWithGoogle}
                        onError={onSignedUpFailed}
                        text="Sign up with Google"
                        mode="light"
                    />
                </Box>
            </Paper>
        </FormsPagesContainer>
    );
}

const colorCondition = (condition) => {
    return {
        "& input": { color: condition ? "white" : "#d32f2f !important" },
        "& fieldset": { borderColor: !condition ? "red !important" : "white" }
    }
}