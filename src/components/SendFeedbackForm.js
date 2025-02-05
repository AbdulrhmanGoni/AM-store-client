"use client"
import { useMediaQuery, TextField, Button, Paper, Box, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import OverlayBg from './OverlayBg'
import { Close, Send } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useSpeedMessage } from '@/hooks/useSpeedMessage'
import { P } from "@abdulrhmangoni/am-store-library";
import { useState } from 'react'
import pagesSpaces from '@/CONSTANTS/pagesSpaces'
import customFetch from '@/utilities/customFetch'


export default function SendFeedbackForm({ open, close }) {

    const userId = useSelector(state => state.userData?._id);
    const { message } = useSpeedMessage();
    const [loading, setLoading] = useState(false);
    const smallScreen = useMediaQuery("(max-width: 500px)");
    const inputsSize = smallScreen ? "small" : "medium"

    async function sendFeedback(ev) {
        ev.preventDefault();
        const form = new FormData(ev.currentTarget);
        const subject = form.get("subject");
        const body = form.get("body");
        if (subject && body) {
            setLoading(true);
            customFetch(`/feedbacks`, "POST", { userId, subject, body })
                .then(((res) => {
                    message(res.message, "success");
                    close();
                }))
                .catch(((error) => {
                    console.log(error)
                    const errorMessage = error.response?.data?.message
                    message(errorMessage || "There is unexpected error happeneds")
                }))
                .finally(() => setLoading(false))
        }
    }

    return (open &&
        <OverlayBg>
            <Paper
                component="form"
                onSubmit={sendFeedback}
                elevation={2}
                className='flex-column j-start'
                sx={{
                    p: pagesSpaces,
                    width: { xs: "96%", sm: "520px", md: "700px" }
                }}
            >
                <P
                    variant='h6'
                    mb={pagesSpaces}
                    sx={{
                        fontWeight: "bold",
                        ml: "3px",
                        textAlign: "start"
                    }}
                >
                    Tell me your Feedback 💬
                </P>
                <Alert severity='info' sx={{ mb: pagesSpaces }}>
                    I welcome any feedback or suggestions you might have! <br />
                    If you faced any problems in the store or you have suggestions to improve it,
                    or even if you have some advice to improve me and my skills as developer,
                    Please feel free to send me a messages.
                </Alert>
                <Box className="flex-column gap2">
                    <TextField
                        label="Subject"
                        name='subject'
                        size={inputsSize}
                        fullWidth
                    />
                    <TextField
                        fullWidth
                        label="Body"
                        name='body'
                        type='textarea'
                        multiline
                        size={inputsSize}
                        minRows={4}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: pagesSpaces }}>
                        <LoadingButton
                            size='small'
                            type='submit'
                            variant='contained'
                            loading={loading}
                            loadingPosition='end'
                            endIcon={<Send />}
                        >
                            Send
                        </LoadingButton>
                        <Button
                            size='small'
                            variant='contained'
                            onClick={() => close()}
                            endIcon={<Close />}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </OverlayBg>
    )
}
