import { Button, Typography } from "@mui/material";

export default function SectionTitle({ style, title, titleStyle, buttonText, action, children }) {
    return (
        <div className="flex-column" style={{ width: "100%", ...style }}>
            <div className="flex-row-center-between">
                <Typography variant="h6"
                    sx={{
                        fontSize: { xs: 18, sm: 21 },
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        ...titleStyle
                    }} >
                    {title}
                </Typography>
                {action && buttonText && <Button size="small" variant="contained" onClick={action}>{buttonText}</Button>}
            </div>
            {children}
        </div>
    )
}