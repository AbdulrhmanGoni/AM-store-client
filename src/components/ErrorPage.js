import { Refresh } from '@mui/icons-material'
import { Alert, Box, CardMedia, IconButton, Paper, Typography } from '@mui/material'

export default function ErrorPage({
    message, title, fullPage, style,
    errorType = "unexpected", withRefreshButton,
    customIllustrate, alertType, hideAlertMsg
}) {

    const illustratorType = {
        404: require("../images/404-error.png"),
        network: require("../images/no-network-error.png"),
        unexpected: require("../images/unexpected-error.png"),
        empty: require("../images/empty.png"),
    }

    const parentStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    }

    const containerOptions = fullPage ? {
        top: 0, left: 0,
        height: "100vh",
        position: "absolute",
        backgroundColor: "background.default"
    } : {}

    const RefreshIcon = () => {
        return <IconButton onClick={() => window.location.reload()}><Refresh /></IconButton>
    }

    return (
        <Box sx={{ ...parentStyle, ...containerOptions, ...style, height: "calc(100vh - 87px)", width: "100%" }}>
            <Box sx={{ ...parentStyle, m: 1, gap: 1, maxWidth: "600px" }}>
                <Paper elevation={2} sx={{ ...parentStyle, p: 2, textAlign: "center", width: "100%" }}>
                    <Typography variant='h6'>{title}</Typography>
                    <CardMedia component="img" sx={{ width: "100%" }} src={customIllustrate ?? illustratorType[errorType]} alt='error' />
                </Paper>
                {!hideAlertMsg && <Alert
                    action={withRefreshButton && <RefreshIcon />}
                    sx={{ width: "100%", alignItems: "center" }}
                    severity={alertType ?? 'error'}
                >
                    {message}
                </Alert>}
            </Box>
        </Box>
    )
}