"use client"
import { AccountCircle } from "@mui/icons-material";
import { Avatar, Badge } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CustomUserAccountIcon({ clickEvent, color }) {

    const { push } = useRouter();
    const userData = useSelector(state => state.userData);

    function handleClick() {
        if (clickEvent) {
            if (userData) {
                push("/user-profile");
            } else {
                push("/log-in");
            }
        }
    }

    if (userData) {
        return (
            <Badge
                color="warning"
                invisible={userData?.hisEmailVerified}
                variant="dot"
            >
                <Avatar
                    sx={{
                        width: 28,
                        height: 28,
                        mb: { xs: "4px", sm: 0 },
                        bgcolor: "primary.main",
                        cursor: "pointer"
                    }}
                    onClick={handleClick}
                    src={userData.avatar}>
                    {userData.userName[0]}
                </Avatar>
            </Badge>
        )
    }
    else {
        return (
            <Badge color="warning" invisible={userData} variant="dot">
                <AccountCircle color={color} sx={{ fontSize: "1.7rem !important" }}
                    onClick={handleClick}
                />
            </Badge>
        )
    }
}