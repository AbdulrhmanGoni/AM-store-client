"use client"
import { useRef, useState } from "react";
import { Avatar, Button, Card, Grid, IconButton, Paper, TextField, Box, Badge, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Email, LockOutlined, LockReset, Person, Save } from "@mui/icons-material";
import { changeUserName_localy } from "@/state-management/userData_slice";
import { useSpeedMessage } from "@/hooks/useSpeedMessage";
import OverlayHoverLink from "@/components/OverlayHoverLink";
import SetUserAvatarForm from "@/components/SetUserAvatarForm";
import TextFieldContainer from "@/components/TextFieldContainer";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import ImageDispayer from "@/components/ImageDispayer";
import pagesSpaces from "@/CONSTANT/pagesSpaces";
import { useRouter } from "next/navigation";
import useUserDataActions from "@/hooks/useUserDataActions";
import { P } from "@abdulrhmangoni/am-store-library";

const textFieldIconStyle = { color: 'primary.main' };

export default function UserProfile() {

    const dispatch = useDispatch();
    const { push } = useRouter();
    const { userName, hisEmailVerified, avatar, userEmail } = useSelector(state => state.userData ?? {});
    const { changeUserName } = useUserDataActions()
    const { message } = useSpeedMessage();
    const [changingUserNameLoading, setChangingUserNameLoading] = useState(false);
    const [userNameIsChangeed, setUserNameState] = useState(false);
    const [changePasswordForm, setChangePasswordFormState] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);
    const userNameFieldRef = useRef();

    function userNameChanges(event) {
        setUserNameState(userName !== event.target.value);
    }

    async function updateUserInfo() {
        const newName = userNameFieldRef.current?.value;
        setChangingUserNameLoading(true);
        changeUserName(newName)
            .then(() => {
                dispatch(changeUserName_localy(newName));
                setUserNameState(false);
                message("UserName Changed Successfully", "success");
            })
            .catch(() => message("Changeding UserName failed for unknown reason"))
            .finally(() => setChangingUserNameLoading(false));
    }

    const editIconStyle = {
        position: "absolute",
        left: 0, bottom: 0,
        backgroundColor: "primary.main",
        "&:hover": {
            backgroundColor: "primary.main",
        }
    }

    return (
        <Card elevation={2} className="flex-column gap2" sx={{ p: pagesSpaces }}>
            <Paper sx={{ p: pagesSpaces }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <P variant="h6">General Info</P>
                    </Grid>
                    <Grid className="flex-center" item xs={12} sm={3} md={2}>
                        <Box sx={{ width: "120px", height: "120px", position: "relative" }}>
                            <Avatar
                                sx={{ width: "100%", height: "100%" }}
                                src={avatar}
                            />
                            <OverlayHoverLink
                                text="View Avatar"
                                disable={!avatar}
                                customAction={() => setOpenAvatar(true)}
                                bgStyle={{ borderRadius: "50%" }}
                            />
                            <IconButton onClick={() => setEditIsOpen(true)} sx={editIconStyle}>
                                <Edit />
                            </IconButton>
                            {
                                openAvatar && <ImageDispayer
                                    imagesList={[avatar]}
                                    title={userName}
                                    openedImage={0}
                                    closeer={() => setOpenAvatar(false)}
                                />
                            }
                        </Box>
                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "column", gap: 2 }} item xs={12} sm={9} md={10}>
                        <TextFieldContainer>
                            <Person sx={textFieldIconStyle} />
                            <TextField
                                fullWidth
                                inputRef={userNameFieldRef}
                                onChange={userNameChanges}
                                defaultValue={userName}
                                name="User-Name"
                                label="User Name"
                                variant="standard"
                            />
                        </TextFieldContainer>
                        <TextFieldContainer>
                            <Tooltip
                                title={hisEmailVerified ? "" : "Your email is not verified, click to verify it"}
                                onClick={() => { !hisEmailVerified && push("/email-verification") }}
                                sx={{ cursor: hisEmailVerified ? "auto" : "pointer" }}
                            >
                                <Badge invisible={hisEmailVerified} variant="dot" color="warning">
                                    <Email sx={textFieldIconStyle} />
                                </Badge>
                            </Tooltip>
                            <TextField
                                fullWidth
                                disabled
                                defaultValue={userEmail}
                                id="User-Email"
                                label="User Email"
                                variant="standard"
                            />
                        </TextFieldContainer>
                    </Grid>
                    {
                        userNameIsChangeed &&
                        <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item xs={12}>
                            <LoadingButton
                                loading={changingUserNameLoading}
                                size="small"
                                onClick={updateUserInfo}
                                variant="contained"
                                startIcon={<Save />}
                                loadingPosition="start"
                            >
                                Save
                            </LoadingButton>
                        </Grid>
                    }
                </Grid>
            </Paper>
            <Paper sx={{ p: 2, borderRadius: 1 }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <P variant="h6">Security</P>
                    </Grid>
                    {
                        changePasswordForm ?
                            <ChangePasswordForm control={setChangePasswordFormState} />
                            : (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldContainer>
                                            <LockOutlined sx={textFieldIconStyle} />
                                            <TextField
                                                sx={{ width: "100%" }}
                                                disabled
                                                defaultValue="* * * * * * * *"
                                                id="User-Password"
                                                label="User Password"
                                                variant="standard"
                                            />
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
                            )
                    }
                </Grid>
            </Paper>
            {editIsOpen && <SetUserAvatarForm close={() => setEditIsOpen(false)} />}
        </Card>
    )
}