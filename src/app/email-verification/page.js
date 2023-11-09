"use client"
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import customFetch from '@/functions/customFetch';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { ErrorThrower, LoadingPage } from '@abdulrhmangoni/am-store-library';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { setEmailAsVerified_localy } from '@/dataBase/userData_slice';

export default function Page() {

    const [currentState, setCurrentState] = useState({ state: "", message: "" });
    const [isLodading, setIsLodading] = useState(false);
    const userData = useSelector(state => state.userData);
    const codeInputRef = useRef();
    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const { back } = useRouter();


    function submitCode() {
        const verificationCode = +codeInputRef.current?.value;
        if (verificationCode) {
            setIsLodading(true);
            customFetch("email-verification", "POST", { verificationCode, userEmail: userData?.userEmail })
                .then((res) => {
                    if (res.ok) setCurrentState({ state: "verified successfully" });
                    else message(res.message);
                })
                .catch(({ response }) => {
                    setCurrentState({ state: "verifying failed", message: response?.data.message });
                })
                .finally(() => setIsLodading(false));
        }
    }

    useEffect(() => {
        if (userData && !userData.hisEmailVerified) {
            setIsLodading(true);
            customFetch("email-verification")
                .catch(() => { setCurrentState({ state: "Email didn't send" }) })
                .then((res) => {
                    if (res.ok) {
                        setCurrentState({ state: "Email sent" });
                        dispatch(setEmailAsVerified_localy());
                    } else {
                        message(res.message, "info");
                        back();
                    }
                })
                .finally(() => setIsLodading(false));
        } else if (userData) {
            message("Your email is already verifyed!", "info");
            back();
        } else back();
    }, [])

    return isLodading ? <LoadingPage />
        : currentState.state === "Email sent" ? (
            <ErrorThrower
                title='Verify your email now !'
                customIllustrator={
                    <Box
                        component="img"
                        src='/verification-code.svg'
                        alt='Illustrator image of verify your email now'
                    />
                }
                hideAlertMsg
            >
                <Box component="form" mb={2}>
                    <TextField
                        variant="filled"
                        placeholder='000000'
                        required
                        title='Please add verification code here'
                        disabled={isLodading}
                        onChange={() => {
                            const verificationCode = +codeInputRef.current?.value
                            if (typeof verificationCode === "number" && verificationCode > 99999) {
                                submitCode();
                            }
                        }}
                        type="text"
                        size='small'
                        inputRef={codeInputRef}
                        inputProps={{ sx: { p: "12px 8px 8px 16px", letterSpacing: 8 } }}
                        sx={{ width: "126px" }}
                    />
                </Box>
                <Typography sx={{ fontSize: "1.20rem" }}>
                    We sent a verification mail to your account {userData?.userEmail},
                    Open your inbox and click on verify link to complete your email verification.
                </Typography>
            </ErrorThrower>
        )
            : currentState.state === "Email didn't send" ? (
                <ErrorThrower
                    title='Ops! Something wrong happends'
                    customIllustrator={
                        <Box
                            component="img"
                            src='/failed.svg'
                            alt='Illustrator image of failed sending verification mail'
                        />
                    }
                    message='Maybe the problem in your network or in you email email'
                    withRefreshButton
                >
                    <Typography>
                        Something wrong happends while we try to send the verification code to your email.
                    </Typography>
                </ErrorThrower>
            )
                : currentState.state === "verified successfully" ? (
                    <ErrorThrower
                        title="Coungrates! your email verified successfully"
                        customIllustrator={
                            <Box
                                component="img"
                                src='/email-verified.png'
                                alt='Illustrator image of email verified successfully'
                            />
                        }
                        hideAlertMsg
                    >
                        <Button onClick={() => { back() }} size='small' variant="contained">
                            Back
                        </Button>
                    </ErrorThrower>
                )
                    : currentState.state === "verifying failed" ? (
                        <ErrorThrower
                            title={currentState.message}
                            customIllustrator={
                                <Box
                                    component="img"
                                    src='/failed.svg'
                                    alt='Illustrator image of failed email verification'
                                />
                            }
                            hideAlertMsg
                        >
                            <Button onClick={() => location.reload()} size='small' variant="contained">
                                try again
                            </Button>
                        </ErrorThrower>
                    ) : null;
}