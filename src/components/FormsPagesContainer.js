import { Box, Paper, Container, useTheme } from '@mui/material'
import pagesSpaces from '@/CONSTANTS/pagesSpaces';
import { AMLogo, P } from '@abdulrhmangoni/am-store-library';

export default function FormsPagesContainer({ children, sx, title, Icon }) {

    const { palette: { mode } } = useTheme();

    return (
        <Box className="flex-column-center full-width"
            sx={{
                backgroundImage: `url(./${mode === "light" ? "ocen-bg" : "tree-bg"}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                color: "white",
                ...sx
            }}>
            <Container maxWidth="xs" sx={{ pt: 2 }}>
                <Paper
                    className="flex-column-center"
                    sx={{
                        p: pagesSpaces,
                        bgcolor: "transparent",
                        boxShadow: "0 0 13px -5px black",
                        backgroundImage: mode === "dark" && "linear-gradient(rgb(51 51 51 / 30%), rgb(51 51 51 / 30%))"
                    }}
                >
                    <AMLogo fullNameAppears sx={{ m: "12px auto", width: "150px", height: "100%" }} />
                    <Box className="flex-row-center gap1">
                        <P component="h1" variant="h5">{title}</P>
                        <Icon sx={{ fontSize: "30px" }} />
                    </Box>
                    {children}
                </Paper>
            </Container>
        </Box>
    )
}
