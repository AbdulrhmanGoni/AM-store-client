import { Box, Grid, Container, Divider } from '@mui/material';
import pagesSpaces from '@/CONSTANTS/pagesSpaces';
import FooterLinks from './FooterLinks';
import FooterEndSection from './FooterEndSection';
import FooterConcatSection from './FooterConcatSection';
import FooterLogoAndBrief from './FooterLogoAndBrief';

export default function Footer() {
    return (
        <Box
            sx={{
                bgcolor: ({ palette: { mode } }) => {
                    return mode == "light" ? "#eee" : "#030a27"
                },
                borderTop: "solid 1px",
                borderTopColor: "divider",
                pt: 2
            }}
        >
            <Container maxWidth="lg" sx={{ px: "0 !important" }}>
                <Box className="flex-column" sx={{ px: pagesSpaces }}>
                    <Grid
                        container
                        spacing={pagesSpaces}
                        pb={pagesSpaces}
                        alignItems="center"
                    >
                        <Grid item xs={12} md={6}>
                            <FooterLogoAndBrief />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box width="100%">
                                <Grid container spacing={pagesSpaces}>
                                    <Grid item xs={12} sm={4.5}>
                                        <FooterLinks />
                                    </Grid>
                                    <Grid item sm={7.5} xs={12}>
                                        <FooterConcatSection />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    <FooterEndSection />
                </Box>
            </Container>
        </Box>
    )
}