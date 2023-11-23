import { Avatar, Box, Typography } from "@mui/material";

const Comment = ({ userName, avatar, text, timeAgo, children }) => {
    return (
        <Box className="flex-row gap1 full-width" sx={{ p: "14px 8px" }}>
            <Avatar sx={{ height: 35, width: 35 }} alt='logo' src={avatar}>
                {userName[0]}
            </Avatar>
            <Box className="flex-column gap1">
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