import { Avatar, Box } from "@mui/material";
import { P } from "@abdulrhmangoni/am-store-library";
const Comment = ({ userName, avatar, text, timeAgo, children }) => {
    return (
        <Box className="flex-row gap1 full-width" sx={{ p: "14px 8px" }}>
            <Avatar sx={{ height: 35, width: 35 }} alt='logo' src={avatar}>
                {userName[0]}
            </Avatar>
            <Box className="flex-column gap1">
                <P variant='subtitle2'>
                    {userName}
                    <P component="span" sx={{ fontSize: "12px", ml: 1 }}>
                        {timeAgo}
                    </P>
                </P>
                <P variant='body2'>{text}</P>
                {children}
            </Box>
        </Box>
    );
}

export default Comment