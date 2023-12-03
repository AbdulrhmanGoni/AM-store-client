import { useRef, useState } from "react";
import { Cancel, LockOpen, LockOutlined, LockPerson, LockReset, Password } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import TextFieldContainer from "./TextFieldContainer";
import { ActionAlert } from "@abdulrhmangoni/am-store-library";
import { LoadingButton } from "@mui/lab";
import useUserDataActions from "@/hooks/useUserDataActions";
import { useSpeedMessage } from "@/hooks/useSpeedMessage";

const ErrorMessage = ({ mesage }) => <Typography sx={{ m: "5px 0px 0px 32px" }} variant="body2" color="error">{mesage}</Typography>

export default function ChangePasswordForm({ control }) {

    const { changeUserPassword, passwordChecker } = useUserDataActions();
    const { message } = useSpeedMessage();
    const currentPasswordRef = useRef();
    const newPassword1Ref = useRef();
    const newPassword2Ref = useRef();
    const [currentPasswordState, setCurrentPasswordState] = useState({ state: true, message: "" });
    const [newPasswordState, setNewPasswordState] = useState(true);
    const [isPassworRedyToChange, setIsPassworRedyToChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function checkPassword() {
        const currentPassword = currentPasswordRef.current?.value;
        setLoading(true);
        const res = await passwordChecker(currentPassword)
            .then((res) => {
                res && setCurrentPassword(currentPassword);
                setIsPassworRedyToChange(res);
                setCurrentPasswordState({ state: res, message: res ? "" : "Wrong password !, Try again" });
                return res;
            })
            .catch(() => {
                setCurrentPasswordState({ state: false, message: "Unexpected error !, Try again" });
                return false
            })
            .finally(() => setLoading(false))

        return res;
    }

    function newPasswordValidation() {
        const newPassword1 = newPassword1Ref.current?.value;
        return (newPassword1 && (newPassword1 === newPassword2Ref.current?.value && newPassword1.length > 7))
    }

    function submitForm() {
        if (isPassworRedyToChange) {
            if (newPasswordValidation()) {
                setNewPasswordState(true);
                changePassword(currentPassword, newPassword1Ref.current?.value);
            }
            else setNewPasswordState(false)
        }
    }

    function changePassword(currentPassword, newPassword) {
        setLoading(true);
        changeUserPassword({ currentPassword, newPassword })
            .then((res) => {
                if (res) {
                    message("Password changed successfully", "success");
                    closeForm();
                } else message("Change password failed", "error")
            })
            .catch(() => { message("Change password failed duo to unexpected error", "error") })
            .finally(() => setLoading(false))
    }

    function closeForm() { control(false); }

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ p: 2, width: "100%" }}>
            <Grid container sx={{ "& label": { fontSize: "15px" } }} spacing={2}>
                <Grid item xs={12}>
                    <TextFieldContainer>
                        {
                            isPassworRedyToChange ? <LockOpen sx={textFieldIconStyle(currentPasswordState.state)} /> :
                                <LockOutlined sx={textFieldIconStyle(currentPasswordState.state)} />
                        }
                        <TextField
                            fullWidth
                            inputRef={currentPasswordRef}
                            type="password"
                            name="current-password"
                            label="Enter current password"
                            variant="standard"
                            disabled={isPassworRedyToChange}
                            error={!currentPasswordState.state}
                        />
                    </TextFieldContainer>
                    {!currentPasswordState.state && <ErrorMessage mesage={currentPasswordState.message} />}
                </Grid>
                {
                    isPassworRedyToChange &&
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextFieldContainer >
                                <Password sx={textFieldIconStyle(newPasswordState)} />
                                <TextField
                                    type="password"
                                    fullWidth
                                    inputRef={newPassword1Ref}
                                    name="new-password1"
                                    label="Enter new password"
                                    variant="standard"
                                    disabled={!isPassworRedyToChange}
                                    error={!newPasswordState}
                                />
                            </TextFieldContainer>
                            {!newPasswordState && <ErrorMessage mesage="Make sure that the both passwords are corresponding" />}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldContainer>
                                <Password sx={textFieldIconStyle(newPasswordState)} />
                                <TextField
                                    type="password"
                                    fullWidth
                                    inputRef={newPassword2Ref}
                                    name="new-password2"
                                    label="Enter new password again"
                                    variant="standard"
                                    error={!newPasswordState}
                                />
                            </TextFieldContainer>
                        </Grid>
                    </>
                }
                <Grid item xs={12} sx={{ display: "flex", mt: 2, gap: 2 }}>
                    {
                        isPassworRedyToChange ?
                            <ActionAlert
                                action={submitForm}
                                openCondition={{ enable: true, condition: newPasswordValidation() }}
                                title="Change password"
                                message="Are you sure you want to change your password?">
                                <LoadingButton
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<LockReset />}
                                    {...buttonsProps()}
                                >
                                    Change
                                </LoadingButton>
                            </ActionAlert>
                            :
                            <LoadingButton
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<LockPerson />}
                                {...buttonsProps(checkPassword)}
                            >
                                Check
                            </LoadingButton>
                    }
                    <Button {...buttonsProps(closeForm)} startIcon={<Cancel />}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const textFieldIconStyle = (colorCondition) => {
    return { mr: 1, my: 0.5, color: colorCondition ? "primary.main" : "red" }
};

const buttonsProps = (action) => { return { onClick: action, size: "small", variant: "contained" } }