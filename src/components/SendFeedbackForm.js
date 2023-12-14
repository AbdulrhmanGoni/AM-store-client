"use client"
import { Grid, TextField, IconButton, Paper, Button } from '@mui/material'
import OverlayBg from './OverlayBg'
import { Bar } from './locationRegistring/LocationsManegement'
import { Close } from '@mui/icons-material'
import sendFeedback from '../functions/sendFeedback'
import { useSelector } from 'react-redux'
import { useSpeedMessage } from '@/hooks/useSpeedMessage'
import { P } from "@abdulrhmangoni/am-store-library";


export default function SendFeedbackForm({ open, close }) {

    const userEmail = useSelector(state => state.userData?.userEmail);
    const { message } = useSpeedMessage();

    async function sendEmail(ev) {
        ev.preventDefault();
        const form = new FormData(ev.currentTarget);
        const subject = form.get("subject");
        const body = form.get("body");
        if (subject && body) {
            sendFeedback({ userEmail, subject, body })
                .catch((() => message("There is unexpected error happeneds")))
                .then((({ ok, message: msg }) => {
                    ok && message(msg, "success"); close();
                    !ok && message(msg, "error");
                }));
        }
    }

    return (open &&
        <OverlayBg open={open}>
            <Paper
                sx={{
                    p: 2,
                    width: { xs: "300px", sm: "450px", md: "700px" }
                }}
                component="form"
                onSubmit={sendEmail}
                elevation={2}
            >
                <Bar dividerBotton sx={{ p: "0px 0px 8px" }}>
                    <P variant='h6'>
                        Tell us your feedback
                    </P>
                    <IconButton onClick={() => close()}>
                        <Close />
                    </IconButton>
                </Bar>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Subject" name='subject' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Body" name='body' type='textarea' multiline minRows={4} />
                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "row-reverse" }} item xs={12}>
                        <Button size='small' type='submit' variant='contained'>Send</Button>
                    </Grid>
                </Grid>
            </Paper>
        </OverlayBg>
    )
}
