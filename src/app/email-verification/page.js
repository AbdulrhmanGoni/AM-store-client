"use client"
import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import customFetch from '@/utilities/customFetch';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { IllustrationCard, LoadingPage, AlertTooltip, P } from '@abdulrhmangoni/am-store-library';
import { useRouter } from 'next/navigation';
import { setEmailAsVerified_localy } from '@/state-management/userData_slice';
import { OpenInBrowser } from '@mui/icons-material';

export default function Page() {

    const expiredCode = 408;
    const tooManyRequestsCode = 429;
    const userData = useSelector(state => state.userData);
    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const { back } = useRouter();
    const [currentState, setCurrentState] = useState({ status: "", message: "" });
    const [isLodading, setIsLodading] = useState(false);
    const [codeFieldStatus, setCodeFieldStatus] = useState({ isError: false, message: "", value: "" });

    function submitCode(verificationCode) {
        setIsLodading(true);
        customFetch("email-verification", "POST", { verificationCode, userEmail: userData?.userEmail })
            .then((res) => {
                if (res.ok) {
                    setCurrentState({ status: "Verified successfully" });
                    dispatch(setEmailAsVerified_localy());
                }
                else message(res.message);
            })
            .catch(({ response }) => {
                const errorMessage = response?.data.message
                if (response?.status == expiredCode) {
                    setCurrentState({ status: expiredCode, message: errorMessage });
                } else if (response?.data.ok === undefined) {
                    setCurrentState({ status: "Verifying failed", message: errorMessage });
                }
                else message(errorMessage);
            })
            .finally(() => setIsLodading(false));
    }

    useEffect(() => {
        if (userData && !userData.hisEmailVerified) {
            setIsLodading(true);
            customFetch("email-verification")
                .then((res) => {
                    if (res.ok) setCurrentState({ status: "Email sent" })
                    else {
                        message(res.message, "info");
                        back();
                    }
                })
                .catch((error) => {
                    if (error.response?.status == tooManyRequestsCode) {
                        setCurrentState({ status: tooManyRequestsCode, message: error.response?.statusText })
                    }
                    else setCurrentState({ status: "Email didn't send" })
                })
                .finally(() => setIsLodading(false));
        } else if (userData) {
            message("Your email is already verifyed!", "info");
            back();
        } else back();
    }, [])

    return isLodading ? <LoadingPage />
        : currentState.status === "Email sent" ? (
            <IllustrationCard
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
                <Box
                    onSubmit={(event) => event.preventDefault()}
                    component="form"
                    mb={2}
                >
                    <AlertTooltip
                        title={codeFieldStatus.message}
                        type='error'
                        tooltipProps={{ open: codeFieldStatus.isError }}
                        action={() => { }}
                        actionIcon={<OpenInBrowser />}
                    >
                        <TextField
                            variant="filled"
                            placeholder='000000'
                            required
                            value={codeFieldStatus.value}
                            onChange={({ target: { value } }) => {
                                const isNumber = !isNaN(+value);
                                const validLength = value.length === 6;
                                setCodeFieldStatus({
                                    isError: !isNumber,
                                    message: isNumber ? "" : "The code should consist of six numbers",
                                    value: value.slice(0, 6)
                                });
                                if (isNumber && validLength) { submitCode(+value) }
                            }}
                            autoFocus
                            suppressContentEditableWarning={false}
                            type="text"
                            size='small'
                            error={codeFieldStatus.isError}
                            inputProps={{ sx: { p: "12px 8px 8px 16px", letterSpacing: 8 } }}
                            sx={{ width: "126px" }}
                        />
                    </AlertTooltip>
                </Box>
                <P sx={{ fontSize: "1.20rem" }}>
                    We sent a verification mail to your account {userData?.userEmail},
                    Open your inbox and click on verify link to complete your email verification.
                </P>
            </IllustrationCard>
        )
            : currentState.status === "Verified successfully" ? (
                <IllustrationCard
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
                </IllustrationCard>
            )
                : currentState.status === "Email didn't send" ? (
                    <IllustrationCard
                        title='Ops! Something wrong happeneds'
                        customIllustrator={
                            <Box
                                component="img"
                                src='/failed.svg'
                                alt='Illustrator image of failed sending verification mail'
                            />
                        }
                        message='Maybe the problem in your network or in you email'
                        withRefreshButton
                    >
                        <P>
                            Something wrong happeneds while we try to send the verification code to your email.
                        </P>
                    </IllustrationCard>
                )
                    : currentState.status === "Verifying failed" ? (
                        <IllustrationCard
                            title={currentState.status}
                            message={currentState.message}
                            customIllustrator={
                                <Box
                                    component="img"
                                    src='/failed.svg'
                                    alt='Illustrator image of failed email verification'
                                />
                            }
                        >
                            <Button onClick={() => location.reload()} size='small' variant="contained">
                                try again
                            </Button>
                        </IllustrationCard>
                    )
                        : currentState.status == tooManyRequestsCode ? (
                            <IllustrationCard
                                title="Too many verification requests!"
                                customIllustrator={
                                    <Box
                                        component="img"
                                        src='/too-many-requests.svg'
                                        alt='Illustrator image of too many requests'
                                    />
                                }
                                hideAlertMsg
                            >
                                <P>
                                    You are trying to get verification codes multible times without send them to verify your email
                                    Come back later and try again
                                </P>
                            </IllustrationCard>
                        )
                            : currentState.status === expiredCode ? (
                                <IllustrationCard
                                    title="Verification code expired!"
                                    message={currentState.message}
                                    withRefreshButton
                                    customIllustrator={
                                        <Box
                                            component="img"
                                            src='/timeout.svg'
                                            alt='Illustrator image of expired code'
                                        />
                                    }
                                ></IllustrationCard>
                            )
                                : null;
}