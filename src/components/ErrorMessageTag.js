import { Typography } from "@mui/material";


export default function ErrorMessageTag({ messge }) {
    return (
        <Typography sx={{ fontSize: "0.87rem", color: "red", mt: "5px" }}>{messge}</Typography>
    )
}