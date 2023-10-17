import { ErrorThrower } from '@abdulrhmangoni/am-store-library';
import { Box, Button } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';

export default function CantAccessMessage() {

    const navigateOptions = { state: useParams().pagePath, replace: true };
    const { push } = useRouter();

    return (
        <Box>
            <ErrorThrower
                title='You Need To Log In first'
                hideAlertMsg
                illustratorType="waiting1"
            >
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
                    <Button onClick={() => push("/sign-up", navigateOptions)} variant="contained">Create An Account</Button>
                    <Button onClick={() => push("/log-in", navigateOptions)} variant="contained">Log In</Button>
                </Box>
            </ErrorThrower>
        </Box>
    )
}
