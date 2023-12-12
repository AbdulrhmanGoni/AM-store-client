import { Send } from '@mui/icons-material';
import { Avatar, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import InputEmoji from 'react-input-emoji';

export default function TextFieldWithImojis(props) {

    const {
        initialValue,
        placeholder,
        handleSubmit,
        buttonProps,
        Loading,
        disabled
    } = props;

    const userData = useSelector(state => state.userData);
    const [inputValue, setInputValue] = useState(initialValue);

    function submit(event) {
        event?.preventDefault?.();
        handleSubmit(inputValue, () => setInputValue(""));
    }

    const avatarSize = { xs: 29, sm: 35 }

    return (
        <Box
            component="form"
            onSubmit={submit}
            sx={commentSectionStyle(disabled)}
            className={disabled ? "disabled-element" : undefined}
        >
            {userData?._id && <Avatar src={userData?.avatar} sx={{ width: avatarSize, height: avatarSize }} />}
            <InputEmoji
                value={inputValue}
                onChange={(text) => setInputValue(text)}
                onEnter={() => { !(!userData?._id || disabled || Loading) && submit() }}
                borderRadius={5}
                placeholder={placeholder}
                keepOpened
            />
            <LoadingButton
                variant='contained'
                size='small'
                sx={{
                    alignSelf: "stretch",
                    fontSize: { xs: "11px", sm: "15px" },
                    "& svg": { fontSize: { xs: "15px", sm: "18px" } }
                }}
                endIcon={<Send />}
                type='submit'
                disabled={!userData?._id || disabled}
                loading={Loading}
                {...buttonProps}
            >
                Send
            </LoadingButton>
        </Box>
    )
}

const commentSectionStyle = (disabled) => {
    const brColors = disabled ? "gray" : "primary.main"
    const textColors = disabled ? "gray" : "text.primary"
    return {
        display: "flex", alignItems: "center", width: "100%", gap: 1, bgcolor: "background.default",
        "& .react-emoji": { border: "1px solid", borderColor: textColors, borderRadius: 1 },
        "& .react-emoji:hover": { borderColor: brColors },
        "& .react-emoji:has(.react-input-emoji--input:focus)": { borderColor: brColors },
        "& .react-input-emoji--container": { m: 0, bgcolor: "transparent", border: "none" },
        "& .react-input-emoji--placeholder": { textWrap: "nowrap" },
        "& .react-input-emoji--input": { p: { xs: "6px", sm: 1 }, color: textColors },
        "& .react-input-emoji--button": { mt: "4px" },
        "& .react-input-emoji--button > svg": { width: "20px", height: "20px" }
    }
}