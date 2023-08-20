import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function CantAccessMassage() {

    const navigateOptions = { state: useParams().pagePath, replace: true };
    const navigate = useNavigate();

    return (
        <Box>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 2, p: "50px 16px"
                }}>
                <Typography variant='h6' fontWeight="bold" >You Need To Log In To Access This Fature</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <Button onClick={() => navigate("/sign-up", navigateOptions)} variant="contained">Create An Account</Button>
                    <Button onClick={() => navigate("/log-in", navigateOptions)} variant="contained">Log In</Button>
                </Box>
            </Paper>
        </Box>
    )
}
