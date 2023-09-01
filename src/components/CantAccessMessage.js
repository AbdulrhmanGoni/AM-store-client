import { ErrorThrower } from '@abdulrhmangoni/am-store-library';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function CantAccessMessage() {

    const navigateOptions = { state: useParams().pagePath, replace: true };
    const navigate = useNavigate();

    return (
        <Box>
            <ErrorThrower
                title='You Need To Log In first'
                hideAlertMsg
                illustratorType="waiting1"
            >
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
                    <Button onClick={() => navigate("/sign-up", navigateOptions)} variant="contained">Create An Account</Button>
                    <Button onClick={() => navigate("/log-in", navigateOptions)} variant="contained">Log In</Button>
                </Box>
            </ErrorThrower>
        </Box>
    )
}
