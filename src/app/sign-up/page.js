"use client"
import {
    Box, Grid, Checkbox,
    FormControlLabel, TextField,
    Button, Avatar, Typography
} from '@mui/material/';
import { PersonAddAlt1 } from '@mui/icons-material';
import useSignUpLogic from '@/hooks/useSignUpLogic';
import { useGoogleAuth, loadingControl } from '@abdulrhmangoni/am-store-library';
import FormsPagesContainer from '@/components/FormsPagesContainer';
import ErrorMessageTag from '@/components/ErrorMessageTag';
import Link from 'next/link';


export default function SignUpPage() {

    const { AuthButton } = useGoogleAuth();
    const {
        emailState,
        passwordState,
        nameState,
        handleSubmit,
        signWithGoogle,
        signWithGoogleFailed
    } = useSignUpLogic();

    return (
        <FormsPagesContainer bgImage={"./sky3.jpg"}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: "white" }}><PersonAddAlt1 /></Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
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
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox name='allowExtraEmails' id='allowExtraEmails' value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
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
                        <Typography textDecoration="underline">
                            Already have an account? Log in
                        </Typography>
                    </Link>
                    <AuthButton
                        onAgree={() => { loadingControl(true) }}
                        onSuccess={signWithGoogle}
                        onError={signWithGoogleFailed}
                        text="Sign up with Google"
                        mode="light"
                    />
                </Box>
            </Box>
        </FormsPagesContainer>
    );
}

const colorCondition = (condition) => {
    return {
        "& input": {
            color: condition ? "white" : "#d32f2f !important"
        },
        "& fieldset": {
            borderColor: !condition ? "red !important" : "white"
        }
    }
}