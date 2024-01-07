import { Box } from '@mui/material';
import { P } from '@abdulrhmangoni/am-store-library';

export default function FooterEndSection() {
    return (
        <Box
            className="flex-row-center-between py2"
            columnGap={2}
            rowGap={1}
            flexWrap="wrap"
        >
            <Box gap={.5} className="flex-row-center-start">
                <P variant="body2">{"\u00A9"}</P>
                <P variant="body2">{new Date().getFullYear()}</P>
                <P color="primary.main" variant="body2">AM Store</P>
            </Box>
            <Box className="flex-row-center-start gap2">
                <P sx={underlineOnHover} variant="body2">Terms of Use</P>
                <P sx={underlineOnHover} variant="body2">Privacy Policy</P>
                <P sx={underlineOnHover} variant="body2">Cookies Policy</P>
            </Box>
        </Box>
    )
}

export const underlineOnHover = {
    "&:hover": {
        textDecoration: "underline",
        color: "primary.main"
    }
}