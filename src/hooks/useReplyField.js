import { addReply } from "../dataBase/actions/commentsActions";
import { useSpeedMessage } from "./useSpeedMessage";
import { useState } from "react";
import TextFieldWithImojis from '../components/TextFieldWithImojis';


export default function useReplyField({ handleAddReplyLocaly, replyData, replyPlace, disabledBtn }) {

    const { message } = useSpeedMessage();
    const [textFieldIsOpen, setTextFieldState] = useState(false);

    function handleSubmit(theReply, clearField) {
        if (theReply) {
            addReply({ ...replyData, text: theReply }, replyPlace)
                .then(newReply => {
                    if (newReply) {
                        handleAddReplyLocaly(newReply);
                        clearField();
                    } else message("adding comment falied");
                });
        }
    }

    const TextFieldComponent = ({ style, placeholder }) => {
        return (
            textFieldIsOpen &&
            <TextFieldWithImojis
                handleSubmit={handleSubmit}
                buttonProps={{ disabled: disabledBtn }}
                placeholder={placeholder}
            />
        )
    }

    return {
        TextFieldComponent,
        toggleTextFieldState: () => { setTextFieldState(state => !state) },
        textFieldIsOpen
    }
}