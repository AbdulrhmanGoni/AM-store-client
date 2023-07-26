import { Grid, TextField, Typography, IconButton, Paper, Button } from '@mui/material'
import OverlayBg from './OverlayBg'
import { Bar } from './locationRegistring/LocationManegement'
import { Close } from '@mui/icons-material'
import sendFeedback from '../dataBase/actions/sendFeedback'
import { useSelector } from 'react-redux'


export default function SendEmailForm({ open, close }) {

    const { userData } = useSelector(state => state);

    async function sendEmail(ev) {
        ev.preventDefault();
        const userEmail = userData ? userData.userEmail : undefined;
        const form = new FormData(ev.currentTarget);
        const title = form.get("title");
        const subject = form.get("subject");
        if (title && subject) {
            await sendFeedback({ userEmail, title, subject });
            close();
        }
    }

    return (open &&
        <OverlayBg>
            <Paper
                sx={{
                    p: 1,
                    width: { xs: "300px", sm: "450px", md: "700px" }
                }} component="form" onSubmit={sendEmail} elevation={2}>
                <Bar dividerBotton>
                    <Typography variant='h6'>
                        Tell us your feedback
                    </Typography>
                    <IconButton onClick={() => close()}>
                        <Close />
                    </IconButton>
                </Bar>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField label="Title" id='title' name='title' fullWidth />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField fullWidth label="Subject" id='subject' name='subject' type='textarea' multiline minRows={4} />
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained' >Send</Button>
                    </Grid>
                </Grid>
            </Paper>
        </OverlayBg>
    )
}
