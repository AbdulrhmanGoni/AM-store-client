import Container from "@mui/material/Container";

export default function homePageContainer({ children }) {
    return (
        <Container
            maxWidth="lg"
            sx={{
                minHeight: "100vh",
                mb: "57px",
                p: { xs: "0px 8px", sm: "0px 16px" },
                bgcolor: "background.default"
            }}
        >
            <div style={{ width: "100%" }}>
                {children}
            </div>
        </Container>
    )
}