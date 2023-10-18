import { Avatar, Box, Typography } from "@mui/material";

const Comment = ({ userName, avatar, text, timeAgo, children, targetReply }) => {
    return (
        <Box
            elevation={1} sx={{
                p: "14px 8px",
                display: "flex",
                width: "100%",
                gap: 1,
            }}>
            <Avatar sx={{ height: 35, width: 35 }} alt='logo' src={avatar}>
                {userName[0]}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {
                    targetReply &&
                    <Typography variant='body2' sx={{ fontStyle: "italic", fontSize: "13px" }}>
                        {"Reply to " + targetReply}
                    </Typography>
                }
                <Typography variant='subtitle2'>
                    {userName}
                    <Typography component="span" sx={{ fontSize: "12px", ml: 1 }}>
                        {timeAgo}
                    </Typography>
                </Typography>
                <Typography variant='body2'>{text}</Typography>
                {children}
            </Box>
        </Box>
    );
}

export default Comment