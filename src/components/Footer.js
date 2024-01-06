import { Box, List, ListItem, Grid, Container, Divider, IconButton } from '@mui/material';
import { P } from '@abdulrhmangoni/am-store-library';
import AMLogo from './AMLogo';
import Link from 'next/link';
import { Email, GitHub, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import pagesSpaces from '@/CONSTANT/pagesSpaces';
import OpenFeedbackFormButton from './OpenFeedbackFormButton';

const links = [
    {
        name: "Figures",
        link: "/products?category=figures"
    },
    {
        name: "Panels",
        link: "/products?category=panels"
    },
    {
        name: "Clothes",
        link: "/products?category=clothes"
    }
]

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
                            <Box mb={{ xs: 2, md: 0 }} className="flex-column gap2">
                                <AMLogo
                                    transparent
                                    sx={{ width: "150px", height: "90px", ml: "-12px" }}
                                />
                                <P maxWidth={{ md: 400 }}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    Iusto, blanditiis officiis at repellendus maxime molestias ratione.
                                    Atque dolor, iusto ipsa at aspernatur porro id aliquam.
                                </P>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box width="100%">
                                <Grid container spacing={pagesSpaces}>
                                    <Grid item xs={12} sm={4.5}>
                                        <P variant='h6'>Catagories</P>
                                        <List>
                                            {
                                                links.map(({ link, name }) => {
                                                    return (
                                                        <ListItem key={name} disablePadding>
                                                            <Link href={link}>
                                                                <P sx={{ ...underlineOnHover, transition: ".3s" }}>{name}</P>
                                                            </Link>
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                        </List>
                                    </Grid>
                                    <Grid item sm={7.5} xs={12}>
                                        <P variant='h6'>Concat me </P>
                                        <Box className="flex-row a-center py1" flexWrap="wrap">
                                            <IconButton>
                                                <GitHub sx={iconsStyles()} />
                                            </IconButton>
                                            <IconButton>
                                                <LinkedIn sx={iconsStyles("#0a66c2")} />
                                            </IconButton>
                                            <IconButton>
                                                <Twitter sx={iconsStyles("#1da1f2")} />
                                            </IconButton>
                                            <IconButton>
                                                <YouTube sx={iconsStyles("red")} />
                                            </IconButton>
                                        </Box>
                                        <Box className="flex-row-center-start" my={2}>
                                            <Email fontSize='small' color='primary' />
                                            <P
                                                component="a"
                                                className="flex-row"
                                                variant="body2"
                                                href="mailto:abdulrhmangoni@gmail.com"
                                                sx={{
                                                    gap: .5,
                                                    ml: .5,
                                                    transition: ".2s",
                                                    ...underlineOnHover
                                                }}
                                            >
                                                <P>abdulrhmangoni@gmail.com</P>
                                            </P>
                                        </Box>
                                        <OpenFeedbackFormButton />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box
                        className="flex-row-center-between py2"
                        columnGap={2}
                        rowGap={1}
                        flexWrap="wrap"
                    >
                        <Box gap={.5} className="flex-row-center-start">
                            <P variant="body2">{`\u00A9`}</P>
                            <P variant="body2">{new Date().getFullYear()}</P>
                            <P color="primary.main" variant="body2">AM Store</P>
                        </Box>
                        <Box className="flex-row-center-start gap2">
                            <P sx={underlineOnHover} variant="body2">Terms of Use</P>
                            <P sx={underlineOnHover} variant="body2">Privacy Policy</P>
                            <P sx={underlineOnHover} variant="body2">Cookies Policy</P>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

const iconsStyles = (color) => {
    return {
        width: 30,
        height: 30,
        borderRadius: 1,
        color
    }
}

const underlineOnHover = {
    "&:hover": {
        textDecoration: "underline",
        color: "primary.main"
    }
}