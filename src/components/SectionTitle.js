import { Button } from "@mui/material";
import { P } from "@abdulrhmangoni/am-store-library";

export default function SectionTitle({ style, title, titleStyle, buttonText, action, children }) {
    return (
        <div className="flex-column" style={{ width: "100%", ...style }}>
            <div className="flex-row-center-between">
                <P variant="h6"
                    sx={{
                        fontSize: { xs: 18, sm: 21 },
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        ...titleStyle
                    }} >
                    {title}
                </P>
                {action && buttonText && <Button size="small" variant="contained" onClick={action}>{buttonText}</Button>}
            </div>
            {children}
        </div>
    )
}