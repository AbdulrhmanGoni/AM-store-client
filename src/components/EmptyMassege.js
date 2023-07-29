import { CardMedia, Paper, Typography } from '@mui/material'
import React from 'react'

export default function EmptyMessage({ sectionName, customMsg, float = true }) {

    const massegeCardStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: float ? null : "500px"
    }
    const center = (aply) => {
        if (aply) {
            return {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }
        } else return {}
    }
    const titleStyle = {
        zIndex: "10",
        top: "48%",
        textAlign: "center",
        maxWidth: "210px",
        color: "black"
    }

    const message = customMsg ?? `Your ${sectionName} Is Empty`;

    return (
        <Paper elevation={2} style={{ ...massegeCardStyle, ...center(float), position: float ? "absolute" : "relative" }} id='massegeCard'>
            <Typography variant='h6' style={{ ...center(true), ...titleStyle }}>{message}</Typography>
            <CardMedia component="img" src={require("../images/Empty-Liustrator.png")} alt='Empty' />
        </Paper>
    )
}
