"use client"
import { TextField, Box, } from "@mui/material"
import { ErrorThrower, AlertTooltip, P } from "@abdulrhmangoni/am-store-library"
import { Img } from "@/app/forget-password/page";
import customFetch from "@/functions/customFetch";
import { useState } from "react";
import { useSpeedMessage } from "@/hooks/useSpeedMessage";

export default function SendingVerificationCodeHandler(props) {

    const {
        requestPath,
        onSuccess,
        onError,
        title,
        description,
        style,
        illustratorImage,
        userEmail,
        autoFocus
    } = props;

    const { message } = useSpeedMessage();
    const [isLodading, setIsLodading] = useState(false);
    const [codeFieldStatus, setCodeFieldStatus] = useState({ isError: false, message: "", value: "" });

    function clearField() {
        setCodeFieldStatus({ isError: false, message: "", value: "" })
    }

    function submitCode(verificationCode) {
        setIsLodading(true);
        customFetch(requestPath, "POST", { verificationCode, userEmail })
            .then((response) => {
                if (response.ok) {
                    onSuccess(response);
                    clearField()
                } else {
                    setCodeFieldStatus({ isError: true, message: response.message, value: "" })
                }
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Unexpected error happened";
                message(errorMessage);
                clearField();
                onError(error);
            })
            .finally(() => setIsLodading(false));
    }

    return (
        <ErrorThrower
            title={title}
            hideAlertMsg
            style={style}
            customIllustrator={
                <Img
                    src={illustratorImage?.src}
                    alt={illustratorImage?.alt}
                />
            }
        >
            <Box onSubmit={(event) => event.preventDefault()} component="form" mb={2}>
                <AlertTooltip
                    title={codeFieldStatus.message}
                    type="error"
                    tooltipProps={{ open: codeFieldStatus.isError }}
                >
                    <TextField
                        variant="filled"
                        placeholder="000000"
                        required
                        value={codeFieldStatus.value}
                        onChange={({ target }) => {
                            const value = target?.value
                            const isNumber = !isNaN(+value);
                            const validLength = value.length === 6;
                            setCodeFieldStatus({
                                isError: !isNumber,
                                message: isNumber ? "" : "The code should consist of six numbers",
                                value: value.slice(0, 6)
                            });
                            if (isNumber && validLength) {
                                target.blur();
                                submitCode(+value)
                            }
                        }}
                        autoFocus={autoFocus}
                        suppressContentEditableWarning={false}
                        type="text"
                        size="small"
                        error={codeFieldStatus.isError}
                        disabled={isLodading}
                        inputProps={{ sx: { p: "12px 8px 8px 16px", letterSpacing: 8 } }}
                        sx={{ width: "126px" }}
                    />
                </AlertTooltip>
            </Box>
            <P sx={{ fontSize: "1.20rem" }}>{description}</P>
        </ErrorThrower>
    )
}