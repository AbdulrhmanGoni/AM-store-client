import { Typography } from "@mui/material";

export default function SectionTitle(props) {

    const style = {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    }

    return (
        <div style={{...style, ...props.style}}>
            <Typography variant="h6"
                sx={{
                    fontSize: { xs: 18, sm: 21 },
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    ...props.titleStyle
                }} >
                {props.title}
            </Typography>
            {props.children}
        </div>
    )
}