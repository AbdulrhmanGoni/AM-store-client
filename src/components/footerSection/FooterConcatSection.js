import { Box, IconButton } from '@mui/material';
import { P } from '@abdulrhmangoni/am-store-library';
import { Email, GitHub, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import OpenFeedbackFormButton from './OpenFeedbackFormButton';
import { underlineOnHover } from './FooterEndSection';


export default function FooterConcatSection() {
    return (
        <>
            <P variant='h6' fontWeight="bolder">Concat me </P>
            <Box className="flex-row a-center py1" ml="-10px" flexWrap="wrap">
                {
                    concatIconsList.map(({ Icon, link, color }) => (
                        <IconButton key={link + color} href={link} target='_blank'>
                            <Icon sx={{ width: 30, height: 30, borderRadius: 1, color }} />
                        </IconButton>
                    ))
                }
            </Box>
            <P
                component="a"
                className="flex-row-center-start"
                variant="body2"
                href="mailto:abdulrhmangoni@gmail.com"
                sx={{
                    gap: .5,
                    mb: 2,
                    transition: ".2s",
                    ...underlineOnHover
                }}
            >
                <Email fontSize='small' color='primary' />
                <P>abdulrhmangoni@gmail.com</P>
            </P>
            <OpenFeedbackFormButton />
        </>
    )
}

const concatIconsList = [
    {
        Icon: GitHub,
        color: "",
        link: "https://github.com/abdulrhmangoni/"
    },
    {
        Icon: LinkedIn,
        color: "#0a66c2",
        link: "https://www.linkedin.com/in/abdulrhman-goni-857a36275"
    },
    {
        Icon: Twitter,
        color: "#1da1f2",
        link: ""
    },
    {
        Icon: YouTube,
        color: "red",
        link: ""
    },
]