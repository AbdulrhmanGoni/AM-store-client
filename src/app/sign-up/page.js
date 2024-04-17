"use client"
import { Box, Grid, TextField, Button } from '@mui/material/';
import { PersonAddAlt1 } from '@mui/icons-material';
import useSignUpLogic from '@/hooks/useSignUpLogic';
import { useGoogleAuth, P, FormsPagesContainer } from '@abdulrhmangoni/am-store-library';
import ErrorMessageTag from '@/components/ErrorMessageTag';
import Link from 'next/link';


export default function SignUpPage() {

    const { AuthButton } = useGoogleAuth({ clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID });
    const {
        emailState,
        passwordState,
        nameState,
        handleSubmit,
        signUpWithGoogle,
        onSignedUpFailed
    } = useSignUpLogic();

    return (
        <FormsPagesContainer title="Sign up" icon={<PersonAddAlt1 sx={{ fontSize: '30px' }} />}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
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
                    style={{ width: "100%" }}
                >
                    <P my={1.5} textDecoration="underline">
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
        </FormsPagesContainer>
    );
}