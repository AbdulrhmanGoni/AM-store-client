import { useState, useEffect } from 'react';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { IconButton, Paper, Typography, useMediaQuery } from '@mui/material';


export default function ImageDispayer({ imagesList, openedImage, closeer, title }) {

    const media = useMediaQuery(("(min-width: 900px)"));
    const [theArray, setArray] = useState([]);
    let [currentImage, setImageAsCurrent] = useState(null);

    useEffect(() => {
        setArray(imagesList);
        setImageAsCurrent(openedImage);
    }, [])

    const overlayLayer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        maxHeight: "700px",
    }

    const arrow = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "20px",
        color: "primary.main"
    }

    const navigateBetweenImages = (direct) => {
        switch (direct) {
            case "left":
                setImageAsCurrent((curren) => {
                    return curren === 0 ? theArray.length - 1 : --curren;
                })
                break;

            case "right":
                setImageAsCurrent((curren) => {
                    return theArray.length - 1 === curren ? 0 : ++curren;
                })
                break;

            default:
                break;
        }
    }

    return (
        <div id='overlayLayer' style={overlayLayer}>
            <Paper id="imagesContainer" style={containersStyle}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    width: "100%", height: "40px"
                }}>
                    <Typography variant='h6'>{title}</Typography>
                    <IconButton
                        onClick={() => closeer(false)}
                        sx={{ color: "primary.main", p: 0 }} >
                        <Close />
                    </IconButton>
                </div>
                <img style={imageStyle} src={theArray[currentImage]} alt={`img number(${currentImage + 1})`} />
                <div style={{
                    display: "flex", justifyContent: "center",
                    alignItems: "center", position: "relative",
                    width: "100%", height: "40px"
                }}>
                    <Typography sx={{ color: "primary.main" }}>{`${imagesList.length} / ${currentImage + 1}`}</Typography>
                    <ArrowBackIos onClick={() => { navigateBetweenImages("left") }} sx={{ ...arrow, left: "10px" }} />
                    <ArrowForwardIos onClick={() => { navigateBetweenImages("right") }} sx={{ ...arrow, right: "10px" }} />
                </div>
            </Paper>
        </div>
    )
}
