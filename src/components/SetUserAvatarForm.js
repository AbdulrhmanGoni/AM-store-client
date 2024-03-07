import { useState } from "react";
import { Box, IconButton, Paper, alpha, useTheme } from "@mui/material";
import { useSpeedMessage } from "@/hooks/useSpeedMessage";
import WaveBg from "./WaveBg";
import { Cancel, Upload } from "@mui/icons-material";
import useAvatarUploader from "@/hooks/useAvatarUploader";
import { LoadingButton } from "@mui/lab";

export default function SetUserAvatarForm({ close }) {

    const { palette: { primary } } = useTheme();
    const { message } = useSpeedMessage();
    const imageUploader = useAvatarUploader();
    const [isUpLoading, setIsUpLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = new FormData(event.currentTarget);
        const api_key = process.env.NEXT_PUBLIC_UPLOAD_IMAGE_API_KEY;
        const upload_image_api = process.env.NEXT_PUBLIC_UPLOAD_IMAGE_API_HOST_NAME;
        const url = `${upload_image_api}?key=${api_key}`;

        setIsUpLoading(true);
        fetch(url, { method: "POST", body: payload })
            .then(res => res.json())
            .then((res) => {
                if (res.success && res.data) {
                    const image = res.data.url ?? res.data.display_url;
                    imageUploader(image).then((avatar) => avatar && close())
                } else {
                    message("Failed to upload your picture!", "error")
                }
            })
            .catch(() => { message("Unexpected error happened, Try Again", "error") })
            .finally(() => setIsUpLoading(false))
    }

    const styleToUpElement = {
        style: { position: "relative", zIndex: 3 }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex-center"
            sx={{
                width: "100%",
                height: "100vh",
                position: "fixed",
                top: 0, left: 0,
                bgcolor: "#00000080"
            }}
        >
            <Paper
                className="flex-column"
                sx={{
                    gap: 1,
                    position: "relative",
                    "& input[type=file]::file-selector-button": {
                        bgcolor: "primary.main",
                        color: "text.primary",
                        border: "none",
                        p: "7px 10px",
                        mr: "9px",
                        borderRadius: "4px",
                        transition: ".4s",
                    },
                    "& input[type=file]::file-selector-button:hover": {
                        bgcolor: alpha(primary.main, .5),
                    },

                }}>
                <Box sx={{ p: 3, pb: 0 }} className="flex-row-center">
                    <input {...styleToUpElement} required={true} type="file" name="image" id="avatar-Uploader" />
                    <LoadingButton
                        type="submit"
                        label="File Uploader"
                        variant="contained"
                        size="small"
                        startIcon={<Upload />}
                        loadingPosition="center"
                        loading={isUpLoading}
                        {...styleToUpElement}
                    >
                        Upload
                    </LoadingButton>
                </Box>
                <IconButton sx={{ position: "absolute !important", top: -17, right: -17 }} onClick={close}>
                    <Cancel />
                </IconButton>
                <WaveBg style={{ width: "100%" }} />
            </Paper>
        </Box>
    )
}