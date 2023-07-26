import { Send } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { addReply } from "../dataBase/actions/commentsActions";
import { useSpeedMessage } from "./useSpeedMessage";
import { useState } from "react";


export default function useReplyField({
    handleAddReplyLocaly,
    replyData, replyPlace,
    disabledBtn, textFieldProps,
    containerStyle
}) {

    const { message } = useSpeedMessage();
    const [textFieldIsOpen, setTextFieldState] = useState(false);


    function toggleTextFieldState() {
        setTextFieldState(state => !state);
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        const theReply = document.getElementById(textFieldProps.id);
        if (theReply.value) {
            addReply({ ...replyData, text: theReply.value }, replyPlace)
                .then(newReply => {
                    if (newReply) {
                        handleAddReplyLocaly(newReply);
                        theReply.value = "";
                    } else message("adding comment falied");
                });
        }
    }

    const TextFieldComponent = ({ style }) => {
        return (
            textFieldIsOpen &&
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "flex-end", gap: 1, ...style }}>
                <TextField {...textFieldProps} />
                <Button
                    disabled={disabledBtn}
                    variant='contained'
                    endIcon={<Send />}
                    size='small'
                    type='submit'
                >
                    Send
                </Button>
            </Box>
        )
    }


    return {
        TextFieldComponent,
        toggleTextFieldState,
        textFieldIsOpen
    }
}
