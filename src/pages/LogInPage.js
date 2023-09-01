import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageWidthBG from '../components/PageWidthBG';
import { useCookies } from 'react-cookie';
import customFetch from '../functions/customFetch';
import loadingControl from '../dataBase/actions/loadingControl';


export default function LogInPage() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [_, setCookies] = useCookies();
    const [thereError, setErrorState] = useState(false);
    const [emailFeild, setEmailFeild] = useState("");
    const [passwordFeild, setPasswordFeild] = useState("");


    function complateLogIn({ userId, accessToken }) {
        let maxAge = 3600 * 24 * 20;
        setCookies("userId", userId, { maxAge });
        setCookies("access-token", accessToken, { maxAge });
        navigate(`/${state ?? ""}`, { replace: true });
        window.location.reload();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userEmail = data.get('email');
        const userPassword = data.get('password');

        loadingControl(true);
        customFetch(`log-in`, "POST", { userEmail, userPassword })
            .then(respons => {
                if (respons) {
                    setErrorState(false);
                    complateLogIn(respons);
                } else {
                    setErrorState(true);
                }
                setPasswordFeild(userPassword);
                setEmailFeild(userEmail);
            })
            .finally(() => { loadingControl(false) })
    };


    const bgImage = require("../images/anonymous-hacker.jpg");

    const InputContainer = ({ children, sx }) => {
        return (
            <Grid item xs={12} sx={{ "& fieldset": { borderColor: thereError ? "red !important" : "white" }, ...sx }}>
                {children}
            </Grid>
        )
    }

    return (
        <PageWidthBG bgImage={bgImage}>
            <Container
                className='customForm'
                component="main"
                maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <InputContainer>
                                <TextField
                                    defaultValue={emailFeild}
                                    fullWidth
                                    name="email"
                                    id="email"
                                    label="Email Address"
                                />
                            </InputContainer>
                            <InputContainer>
                                <TextField
                                    defaultValue={passwordFeild}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </InputContainer>
                            <Grid item>
                                {thereError && <Typography style={{ color: "red" }}>
                                    There Are Issue in Email Or password, Try Again With More verify
                                </Typography>}
                            </Grid>
                            <Grid item>
                                <Link style={{ textDecoration: "underline" }}>
                                    forget your password? change it
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Typography onClick={() => navigate("/sign-up", { replace: true, state })} style={{ textDecoration: "underline" }}>
                                you dont't have an account? Sign up
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </PageWidthBG>
    );
}

