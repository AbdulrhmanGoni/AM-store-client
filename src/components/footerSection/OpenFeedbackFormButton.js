import { Button } from '@mui/material';
import { useState } from 'react';
import SendFeedbackForm from '../SendFeedbackForm';

export default function OpenFeedbackFormButton() {

    const [feedbackFormState, setOpenFeedbackState] = useState(false);

    return (
        <>
            <Button
                variant='contained'
                onClick={() => { setOpenFeedbackState(true); }}
                size='small'
                sx={{ textTransform: "none" }}
            >
                Have a Feedback?
            </Button>
            {
                feedbackFormState &&
                <SendFeedbackForm
                    open={feedbackFormState}
                    close={() => { setOpenFeedbackState(false); }}
                />
            }
        </>
    )
}
