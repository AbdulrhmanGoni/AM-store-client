import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ActionAlert({ children, title, message, action, openCondition = { enable: false } }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (openCondition.enable) {
            openCondition.condition && setOpen(true);
        } else setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const agree = () => {
        action();
        setOpen(false);
    };

    return (
        <div>
            {React.cloneElement(children, { onClick: handleClickOpen })}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button variant='contained' onClick={agree} autoFocus>ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}