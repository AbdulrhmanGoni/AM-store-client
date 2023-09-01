import { Avatar, Button, Card, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Email, LockOutlined, LockReset, Person } from "@mui/icons-material";
import { setNewUserName } from "../dataBase/actions/userData_slice_actions";
import { setNewUserName_localy } from "../dataBase/userData_slice";
import withGurd from "../components/withGurd";
import { useSpeedMessage } from "../hooks/useSpeedMessage";
import OverlayHoverLink from "../components/OverlayHoverLink";
import SetUserAvatarForm from "../components/SetUserAvatarForm";
import TextFieldContainer from "../components/TextFieldContainer";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ImageDispayer from "../components/ImageDispayer";

const passwordHeading = (passwordLength) => "*".repeat(passwordLength)
const textFieldIconStyle = { color: 'primary.main', mr: 1, my: 0.5 };

function UserProfile() {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const { message } = useSpeedMessage();
    const [userNameIsChangeed, setUserNameState] = useState(false);
    const [changePasswordForm, setChangePasswordFormState] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);

    function userNameChanges(event) {
        if (userData.userName !== event.target.value) {
            setUserNameState(true);
        } else {
            setUserNameState(false);
        }
    }

    async function updateUserInfo() {
        const newName = document.querySelector("#User-Name").value;
        setNewUserName({ newName, userId: userData._id })
            .then(name => {
                if (name === newName) {
                    dispatch(setNewUserName_localy(name));
                    setUserNameState(false);
                    message("UserName Changed Successfully", "success");
                }
            });
    }

    const editIconStyle = {
        position: "absolute",
        left: 0, bottom: 0,
        backgroundColor: "primary.main",
        "&:hover": {
            backgroundColor: "primary.main",
        }
    }

    if (userData) {
        return (
            <Card elevation={2} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, borderRadius: 1 }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">General Info</Typography>
                        </Grid>
                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} item xs={12} sm={3} md={2}>
                            <Box sx={{ width: "120px", height: "120px", position: "relative" }}>
                                <Avatar
                                    sx={{ width: "100%", height: "100%" }}
                                    src={userData?.avatar ?? require("../images/1083.jpg")}
                                />
                                <OverlayHoverLink
                                    text="View Avatar"
                                    customAction={() => setOpenAvatar(true)}
                                    bgStyle={{ borderRadius: "50%" }} />
                                <IconButton onClick={() => setEditIsOpen(true)} sx={editIconStyle}>
                                    <Edit />
                                </IconButton>
                                {openAvatar && <ImageDispayer
                                    imagesList={[userData.avatar]}
                                    title={userData.userName}
                                    openedImage={0}
                                    closeer={() => setOpenAvatar(false)}
                                />}
                            </Box>
                        </Grid>
                        <Grid sx={{ display: "flex", flexDirection: "column", gap: 2 }} item xs={12} sm={9} md={10}>
                            <TextFieldContainer>
                                <Person sx={textFieldIconStyle} />
                                <TextField fullWidth onChange={userNameChanges} defaultValue={userData.userName} id="User-Name" label="User Name" variant="standard" />
                            </TextFieldContainer>
                            <TextFieldContainer>
                                <Email sx={textFieldIconStyle} />
                                <TextField fullWidth disabled defaultValue={userData.userEmail} id="User-Email" label="User Email" variant="standard" />
                            </TextFieldContainer>
                        </Grid>
                        {
                            userNameIsChangeed &&
                            <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item xs={12}>
                                <Button size="small" onClick={updateUserInfo} variant="contained">Save</Button>
                            </Grid>
                        }
                    </Grid>
                </Paper>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Security</Typography>
                        </Grid>
                        {
                            changePasswordForm ?
                                <ChangePasswordForm
                                    control={setChangePasswordFormState}
                                    message={message}
                                />
                                :
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldContainer>
                                            <LockOutlined sx={textFieldIconStyle} />
                                            <TextField sx={{ width: "100%" }} disabled defaultValue={passwordHeading(8)} id="User-Password" label="User Password" variant="standard" />
                                        </TextFieldContainer>
                                    </Grid>
                                    <Grid item xs={12} sm={6}
                                        sx={{ display: "flex", alignItems: "flex-end" }}
                                    >
                                        <Button
                                            size="small"
                                            onClick={() => setChangePasswordFormState(true)}
                                            sx={{ width: "100%" }}
                                            startIcon={<LockReset />}
                                            variant="outlined">
                                            Change Password
                                        </Button>
                                    </Grid>
                                </>
                        }
                    </Grid>
                </Paper>
                {editIsOpen && <SetUserAvatarForm close={() => setEditIsOpen(false)} />}
            </Card>
        )
    }
}

export default withGurd(UserProfile);