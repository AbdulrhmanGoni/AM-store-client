import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingCircle = ({ style, id, darkBg }) => {

    const startStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        minHeight: "100vh",
        width: "100%",
        display: id === "loadingCircle" ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backgroundColor: darkBg ? "#00000080" : undefined,
    }

    return (
        <div id={id} style={{ ...startStyle, ...style }}>
            <CircularProgress color='primary' />
        </div>
    );
}

export default LoadingCircle;
