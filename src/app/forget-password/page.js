"use client"
import { Container, TextField, Box, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useState } from "react"
import { IllustrationCard } from "@abdulrhmangoni/am-store-library"
import Image from "next/image"
import { useRouter } from "next/navigation"
import pagesSpaces from "@/CONSTANTS/pagesSpaces"
import { Send, ShoppingCart } from "@mui/icons-material"
import useChangingPasswordRequest from "@/hooks/useChangingPasswordRequest"
import isValidEmail from "@/functions/isValidEmail"
import SendingVerificationCodeHandler from "@/components/SendingVerificationCodeHandler"
import useCompletingChangingPassword from "@/hooks/useCompletingChangingPassword"


export default function Page() {

    const { push } = useRouter();
    const {
        changingPasswordRequest,
        changingPasswordRequestLoading,
        changingPasswordRequestError,
        changingPasswordRequestErrorMessage,
        setChangingPasswordRequestError
    } = useChangingPasswordRequest();

    const {
        completingChangingPassword,
        setNewPasswordFieldStatus,
        setChangePasswordToken,
        changingPasswordLoading,
        newPasswordFieldError,
        newPasswordFieldMessage
    } = useCompletingChangingPassword();

    const initialLeftPropertyOfCards = {
        forgetPasswordCard: "0%",
        verificationCard: "100%",
        changePasswordForm: "200%",
        doneMessage: "300%",
    }

    const [{
        forgetPasswordCard,
        verificationCard,
        changePasswordForm,
        doneMessage
    }, setLeftPropertyOfCards] = useState(initialLeftPropertyOfCards);

    const [userEmail, setUserEmail] = useState("");
    const [autoFocusVerificationCodeFiled, setAutoFocusVerificationCodeFiled] = useState(false);

    function goToVerificationStep(userEmail) {
        setUserEmail(userEmail);
        setLeftPropertyOfCards({
            forgetPasswordCard: "-100%",
            verificationCard: "0%",
            changePasswordForm: "100%",
            doneMessage: "200%"
        });
        setTimeout(() => setAutoFocusVerificationCodeFiled(true), cardsTransitionDuration);
    }

    function sendChangingPasswordRequest(event) {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget)
        const userEmail = formdata.get("user-email");
        if (isValidEmail(userEmail)) {
            changingPasswordRequest(userEmail, () => goToVerificationStep(userEmail));
        } else {
            setChangingPasswordRequestError({
                status: false,
                message: userEmail?.length ? "This is not a valid email!" : "You didn't add your email !"
            })
        }
    }

    function handleCompletingChangingPassword(event) {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);
        const thePassword = formdata.get("the-new-password-again");
        const thePassword2 = formdata.get("the-new-password");
        if (thePassword === thePassword2) {
            if (thePassword.length > 5) {
                const payload = { newPassword: thePassword, userEmail }
                completingChangingPassword(payload,
                    () => {
                        setLeftPropertyOfCards({
                            forgetPasswordCard: "-300%",
                            verificationCard: "-200%",
                            changePasswordForm: "-100%",
                            doneMessage: "0%"
                        });
                    },
                    () => { setLeftPropertyOfCards(initialLeftPropertyOfCards) }
                );
            } else {
                setNewPasswordFieldStatus({
                    status: false,
                    message: "The password should consist of 6 characters at least"
                });
            }
        } else {
            setNewPasswordFieldStatus({
                status: false,
                message: "You entered two different passwords, Make sure to enter the same password the twice"
            });
        }
    }

    const sharedTextFieldProps = {
        suppressContentEditableWarning: false,
        fullWidth: true,
        size: "small",
        sx: { mb: 1 }
    }
    const sharedLoadingButtonProps = {
        size: "small",
        variant: "contained",
        type: "submit",
        loadingPosition: "end",
        fullWidth: true
    }

    return (
        <Container
            maxWidth="sm"
            className="flex-column-center"
            sx={{
                display: "flex",
                minHeight: "100vh",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <IllustrationCard
                title="Do you forget your password?"
                hideAlertMsg
                style={{ ...cardsStyle, left: forgetPasswordCard }}
                customIllustrator={
                    <Img
                        src="/forget-password.svg"
                        alt="illustration image of forgeting password"
                    />
                }
            >
                <form style={{ width: "100%" }} onSubmit={sendChangingPasswordRequest}>
                    <TextField
                        name="user-email"
                        placeholder="Enter Your email here"
                        label="Your email to send verification code"
                        onChange={() => {
                            if (changingPasswordRequestError) {
                                setChangingPasswordRequestError({ status: true, message: "" });
                            }
                        }}
                        error={changingPasswordRequestError}
                        helperText={changingPasswordRequestErrorMessage}
                        suppressContentEditableWarning={false}
                        fullWidth
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    <LoadingButton
                        loading={changingPasswordRequestLoading}
                        disabled={changingPasswordRequestLoading}
                        endIcon={<Send />}
                        {...sharedLoadingButtonProps}
                    >
                        Request Changing Password
                    </LoadingButton>
                </form>
            </IllustrationCard>
            <SendingVerificationCodeHandler
                title="Prove your ownership first"
                style={{ ...cardsStyle, left: verificationCard }}
                userEmail={userEmail}
                requestPath="forget-password?type=proving-email-ownership"
                autoFocus={autoFocusVerificationCodeFiled}
                enableAutoFocusOnlyWhenRender
                onSuccess={(response) => {
                    setChangePasswordToken(response.changePasswordToken);
                    setAutoFocusVerificationCodeFiled(false);
                    setLeftPropertyOfCards({
                        forgetPasswordCard: "-200%",
                        verificationCard: "-100%",
                        changePasswordForm: "0%",
                        doneMessage: "100%"
                    });
                }}
                onError={() => {
                    setLeftPropertyOfCards(initialLeftPropertyOfCards);
                    setAutoFocusVerificationCodeFiled(false);
                }}
                illustratorImage={{
                    src: "/verification-code.svg",
                    alt: "illustration image of sending verification code"
                }}
                description={
                    "We sent a mail with verification code to your account"
                    + ` (${userEmail}), ` +
                    "Open your inbox and copy the code and paste it in the field above for proving your identity"
                }
            />
            <IllustrationCard
                title="Change your password now"
                hideAlertMsg
                style={{ ...cardsStyle, left: changePasswordForm }}
                customIllustrator={
                    <Img
                        src="/reset-password.svg"
                        alt="illustration image of resetting password"
                    />
                }
            >
                <form style={{ width: "100%" }} onSubmit={handleCompletingChangingPassword}>
                    <TextField
                        name="the-new-password"
                        placeholder="Enter the new password"
                        label="The new password"
                        type="password"
                        error={newPasswordFieldError}
                        {...sharedTextFieldProps}
                    />
                    <TextField
                        name="the-new-password-again"
                        placeholder="Enter the new password again"
                        label="The new password again"
                        type="password"
                        error={newPasswordFieldError}
                        helperText={newPasswordFieldMessage}
                        {...sharedTextFieldProps}
                    />
                    <LoadingButton
                        loading={changingPasswordLoading}
                        endIcon={<Send />}
                        {...sharedLoadingButtonProps}
                    >
                        Complete Changing Password
                    </LoadingButton>
                </form>
            </IllustrationCard>
            <IllustrationCard
                title="Congrats ! You resetted your password"
                hideAlertMsg
                style={{ ...cardsStyle, left: doneMessage }}
                customIllustrator={
                    <Img
                        src="/reset-done.svg"
                        alt="illustration image of resetting password done"
                    />
                }
            >
                <Box className="flex-row-center gap2 full-width">
                    <Button
                        variant="contained"
                        endIcon={<ShoppingCart />}
                        size="small"
                        onClick={() => push("/log-in")}
                    >
                        Log in now
                    </Button>
                </Box>
            </IllustrationCard>
        </Container>
    )
}

export function Img({ src, alt }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={300}
            height={300}
            priority
            style={{ width: "100%", height: "auto" }}
        />
    )
}

const cardsTransitionDuration = 350;
const cardsStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    transition: cardsTransitionDuration + "ms",
    p: pagesSpaces,
}