import { useRef, useState } from "react";
import { Cancel, LockOpen, LockOutlined, LockPerson, LockReset, Password } from "@mui/icons-material";
import { Box, Grid, TextField, Button } from "@mui/material";
import TextFieldContainer from "./TextFieldContainer";
import { ActionAlert, P } from "@abdulrhmangoni/am-store-library";
import { LoadingButton } from "@mui/lab";
import useUserDataActions from "@/hooks/useUserDataActions";
import { useSpeedMessage } from "@/hooks/useSpeedMessage";


export default function ChangePasswordForm({ control }) {

    const { changeUserPassword, passwordChecker } = useUserDataActions();
    const { message } = useSpeedMessage();
    const currentPasswordRef = useRef();
    const newPassword1Ref = useRef();
    const newPassword2Ref = useRef();
    const [currentPasswordState, setCurrentPasswordState] = useState({ status: true, message: "" });
    const [newPasswordState, setNewPasswordState] = useState({ status: true, message: "" });
    const [isPasswordReadyToChange, setIsPasswordReadyToChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function checkPassword() {
        const currentPassword = currentPasswordRef.current?.value;
        if (currentPassword) {
            setLoading(true);
            await passwordChecker(currentPassword)
                .then((res) => {
                    res.ok && setCurrentPassword(currentPassword);
                    setIsPasswordReadyToChange(res.ok);
                    setCurrentPasswordState({ status: res.ok, message: res?.message });
                    return res.ok;
                })
                .catch((error) => {
                    const response = error.response?.data;
                    setCurrentPasswordState(response ? response : { status: false, message: "Unexpected Error!" });
                    return false
                })
                .finally(() => setLoading(false))
        }
    }

    function newPasswordValidation() {
        const newPassword1 = newPassword1Ref.current?.value;
        return (newPassword1 && (newPassword1 === newPassword2Ref.current?.value && newPassword1.length > 7))
    }

    function submitForm() {
        if (isPasswordReadyToChange) {
            if (newPasswordValidation()) {
                setNewPasswordState({ status: true, message: "" });
                changePassword(currentPassword, newPassword1Ref.current?.value);
            }
            else setNewPasswordState({ status: false, message: "Please make sure that the both passwords are corresponding" });
        }
    }

    function changePassword(currentPassword, newPassword) {
        setLoading(true);
        changeUserPassword({ currentPassword, newPassword })
            .then(() => {
                message("Password changed successfully", "success");
                closeForm();
            })
            .catch((error) => {
                const responseMessage = error.response?.data?.message;
                setNewPasswordState({ status: false, message: responseMessage || "Unexpected Error!" })
            })
            .finally(() => setLoading(false))
    }

    function closeForm() { control(false); }

    return (
        <Box component="form" onSubmit={(event) => event.preventDefault()} sx={{ p: 2, width: "100%" }}>
            <Grid container sx={{ "& label": { fontSize: "15px" } }} spacing={2}>
                <Grid item xs={12}>
                    <TextFieldContainer>
                        {
                            isPasswordReadyToChange ? <LockOpen sx={textFieldIconStyle(currentPasswordState.status)} /> :
                                <LockOutlined sx={textFieldIconStyle(currentPasswordState.status)} />
                        }
                        <TextField
                            fullWidth
                            inputRef={currentPasswordRef}
                            type="password"
                            name="current-password"
                            label="Enter current password"
                            variant="standard"
                            disabled={isPasswordReadyToChange}
                            error={!currentPasswordState.status}
                        />
                    </TextFieldContainer>
                    {!currentPasswordState.status && <ErrorMessage mesage={currentPasswordState.message} />}
                </Grid>
                {
                    isPasswordReadyToChange &&
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextFieldContainer >
                                <Password sx={textFieldIconStyle(newPasswordState.status)} />
                                <TextField
                                    type="password"
                                    fullWidth
                                    inputRef={newPassword1Ref}
                                    name="new-password1"
                                    label="Enter new password"
                                    variant="standard"
                                    disabled={!isPasswordReadyToChange}
                                    error={!newPasswordState.status}
                                />
                            </TextFieldContainer>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldContainer>
                                <Password sx={textFieldIconStyle(newPasswordState.status)} />
                                <TextField
                                    type="password"
                                    fullWidth
                                    inputRef={newPassword2Ref}
                                    name="new-password2"
                                    label="Enter new password again"
                                    variant="standard"
                                    error={!newPasswordState.status}
                                />
                            </TextFieldContainer>
                        </Grid>
                        <Grid item xs={12} sm={12} pt="0px !important">
                            {
                                !newPasswordState.status &&
                                <ErrorMessage mesage={newPasswordState.message} />
                            }
                        </Grid>
                    </>
                }
                <Grid item xs={12} sx={{ display: "flex", mt: 2, gap: 2 }}>
                    {
                        isPasswordReadyToChange ?
                            <ActionAlert
                                action={submitForm}
                                openCondition={{ enable: true, condition: newPasswordValidation() }}
                                title="Change password"
                                message="Are you sure you want to change your password?">
                                <LoadingButton
                                    startIcon={<LockReset />}
                                    {...buttonsProps(undefined, loading)}
                                    loadingPosition="start"
                                >
                                    Change
                                </LoadingButton>
                            </ActionAlert>
                            :
                            <LoadingButton
                                startIcon={<LockPerson />}
                                {...buttonsProps(checkPassword, loading)}
                                loadingPosition="start"
                            >
                                Check
                            </LoadingButton>
                    }
                    <Button {...buttonsProps(closeForm)} disabled={loading} startIcon={<Cancel />}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const ErrorMessage = ({ mesage }) => <P sx={{ m: "5px 0px 0px 32px" }} variant="body2" color="error">{mesage}</P>

const textFieldIconStyle = (colorCondition) => {
    return { mr: 1, my: 0.5, color: colorCondition ? "primary.main" : "red" }
};

const buttonsProps = (action, loading) => {
    return {
        onClick: action,
        size: "small",
        variant: "contained",
        loading,
        disabled: loading
    }
}