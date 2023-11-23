
import { Send } from '@mui/icons-material';
import { Avatar, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import InputEmoji from 'react-input-emoji'

export default function TextFieldWithImojis({ initialValue, placeholder, handleSubmit, buttonProps, Loading }) {

    const userData = useSelector(state => state.userData);
    const [inputValue, setInputValue] = useState(initialValue);

    function submit(event) {
        event.preventDefault();
        handleSubmit(inputValue, () => setInputValue(""));
    }

    return (
        <Box
            component="form" onSubmit={submit}
            sx={commentSectionStyle}
        >
            {userData?._id && <Avatar src={userData?.avatar} sx={{ width: 35, height: 35 }} />}
            <InputEmoji
                value={inputValue}
                onChange={(text) => setInputValue(text)}
                borderRadius={5}
                placeholder={placeholder} />
            <LoadingButton
                variant='contained'
                size='small'
                sx={{ alignSelf: "stretch" }}
                endIcon={<Send />}
                type='submit'
                disabled={!userData?._id}
                loading={Loading}
                {...buttonProps}
            >
                Send
            </LoadingButton>
        </Box>
    )
}

const commentSectionStyle = {
    display: "flex", alignItems: "center", width: "100%", gap: 1, bgcolor: "background.default",
    "& .react-emoji": { border: "1px solid", borderColor: "primary.main", borderRadius: 1, },
    "& .react-input-emoji--container": { m: 0, bgcolor: "transparent", border: "none" },
    "& .react-input-emoji--input": { p: 1, color: "text.primary" },
    "& .react-input-emoji--button": { mt: "4px" },
    "& .react-input-emoji--button > svg": { width: "20px", height: "20px" }
}