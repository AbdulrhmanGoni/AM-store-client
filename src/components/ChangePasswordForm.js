import { Cancel, LockOpen, LockOutlined, LockPerson, LockReset, Password } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { changeUserPassword, passwordChecker } from "../dataBase/actions/userData_slice_actions";
import TextFieldContainer from "./TextFieldContainer";

const ErrorMessage = ({ mesage }) => <Typography sx={{ m: "5px 0px 0px 32px" }} variant="body2" color="error">{mesage}</Typography>

export default function ChangePasswordForm({ control, message }) {

    const { userData } = useSelector(state => state);
    const [currentPasswordState, setCurrentPasswordState] = useState(true);
    const [newPasswordState, setNewPasswordState] = useState(true);
    const [isPassworRedyToChange, setIsPassworRedyToChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        !isPassworRedyToChange && passwordChecker(userData._id, data.get("current-password"))
            .then((res) => {
                setCurrentPassword(data.get("current-password"));
                setIsPassworRedyToChange(res);
                setCurrentPasswordState(res);
            })
            .catch(() => { setCurrentPasswordState(false); })

        if (isPassworRedyToChange) {
            const newPassword1 = data.get("new-password1");
            if (newPassword1 === data.get("new-password2") && newPassword1.length > 7) {
                setNewPasswordState(true);
                changePassword(currentPassword, newPassword1);
            }
            else {
                setNewPasswordState(false);
            }
        }
    }

    function changePassword(currentPassword, newPassword) {
        changeUserPassword({ userId: userData._id, currentPassword, newPassword })
            .then((res) => {
                if (res) {
                    message("Password changed successfully", "success");
                    closeForm();
                } else message("Change password failed", "error")
            })
            .catch(() => { message("Change password failed duo to unexpected error", "error") })
    }

    function closeForm() { control(false); }

    const textFieldIconStyle = (colorCondition) => {
        return { mr: 1, my: 0.5, color: colorCondition ? "primary.main" : "red" }
    };

    return (
        <Box component="form" sx={{ p: 2, width: "100%" }} onSubmit={handleSubmit}>
            <Grid container sx={{ "& label": { fontSize: "15px" } }} spacing={2}>
                <Grid item xs={12}>
                    <TextFieldContainer>
                        {
                            isPassworRedyToChange ? <LockOpen sx={textFieldIconStyle(currentPasswordState)} /> :
                                <LockOutlined sx={textFieldIconStyle(currentPasswordState)} />
                        }
                        <TextField
                            fullWidth
                            type="password"
                            name="current-password"
                            label="Enter current password"
                            variant="standard"
                            disabled={isPassworRedyToChange}
                            error={!currentPasswordState}
                        />
                    </TextFieldContainer>
                    {!currentPasswordState && <ErrorMessage mesage="It is invalid password!" />}
                </Grid>
                {
                    isPassworRedyToChange &&
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextFieldContainer >
                                <Password sx={textFieldIconStyle(newPasswordState)} />
                                <TextField
                                    type="password"
                                    sx={{ width: "100%" }}
                                    name="new-password1"
                                    id="new-password1"
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
                                    sx={{ width: "100%" }}
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
                    <Button
                        type="submit"
                        size="small"
                        startIcon={isPassworRedyToChange ? <LockReset /> : <LockPerson />}
                        variant="contained"
                    >
                        {isPassworRedyToChange ? "Change" : "Check"}
                    </Button>
                    <Button
                        onClick={closeForm}
                        size="small"
                        startIcon={<Cancel />}
                        variant="contained">
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}