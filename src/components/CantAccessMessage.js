import { IllustrationCard } from '@abdulrhmangoni/am-store-library';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CantAccessMessage() {

    const { push } = useRouter();

    return (
        <Box className="flex-column-center" sx={{ minHeight: "100vh" }}>
            <IllustrationCard
                title='You have to sign up first'
                hideAlertMsg
                illustratorType="signUp"
            >
                <Box className="flex-row-center gap2">
                    <Button onClick={() => push("/sign-up")} variant="contained">Sign Up</Button>
                    <Button onClick={() => push("/log-in")} variant="outlined">I have an Account</Button>
                </Box>
            </IllustrationCard>
        </Box>
    )
}
