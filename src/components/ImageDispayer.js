import { useState, useEffect } from 'react';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { Box, IconButton, Paper, useMediaQuery } from '@mui/material';
import { P } from "@abdulrhmangoni/am-store-library";

export default function ImageDispayer({ imagesList, openedImage, closeer, title }) {

    const media = useMediaQuery(("(min-width: 900px)"));
    const [theArray, setArray] = useState([]);
    let [currentImage, setImageAsCurrent] = useState(null);

    useEffect(() => {
        setArray(imagesList);
        setImageAsCurrent(openedImage);
    }, [])

    const overlayLayer = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#00000050",
        zIndex: 100
    }

    const containersStyle = {
        position: "relative",
        width: media ? "900px" : "96%",
        maxHeight: "700px"
    }

    const imageStyle = {
        width: "100%",
        maxHeight: "670px",
    }

    const arrow = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "20px",
        color: "primary.main"
    }

    const navigateBetweenImages = (dir) => {
        setImageAsCurrent((curren) => {
            if (dir === "left") {
                return curren === 0 ? theArray.length - 1 : --curren;
            }
            else if (dir === "right") {
                return theArray.length - 1 === curren ? 0 : ++curren;
            }
            else return curren
        })
    }

    return (
        <div id='overlayLayer' className='flex-center' style={overlayLayer}>
            <Paper id="imagesContainer" style={containersStyle}>
                <Box className="flex-row-center-between"
                    sx={{
                        justifyContent: "space-between",
                        padding: "10px",
                        width: "100%", height: "40px",
                        borderBottom: "1px solid",
                        borderColor: "primary.main"
                    }}>
                    <P variant='h6'>{title}</P>
                    <IconButton
                        onClick={() => closeer(false)}
                        sx={{ color: "primary.main", p: 0 }} >
                        <Close />
                    </IconButton>
                </Box>
                <Box component="img" sx={imageStyle} src={theArray[currentImage]} alt={`img number(${currentImage + 1})`} />
                <Paper
                    className='flex-center'
                    sx={{
                        position: "relative",
                        width: "100%", height: "40px"
                    }}>
                    <P sx={{ color: "primary.main" }}>{`${imagesList.length} / ${currentImage + 1}`}</P>
                    <ArrowBackIos onClick={() => { navigateBetweenImages("left") }} sx={{ ...arrow, left: "10px" }} />
                    <ArrowForwardIos onClick={() => { navigateBetweenImages("right") }} sx={{ ...arrow, right: "10px" }} />
                </Paper>
            </Paper>
        </div>
    )
}
