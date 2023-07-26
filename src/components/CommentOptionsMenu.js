import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CircularProgress, IconButton } from '@mui/material';
import { CopyAll, Delete, Edit, MoreVert } from '@mui/icons-material';

export default function CommentOptionsMenu({ style, isOwner, deleteFun, editFun, styleReplace}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        await deleteFun();
        setAnchorEl(null);
        setLoadingDelete(false);
    };

    const styleIcon = styleReplace ?? { right: 4, top: 4, position: "absolute", ...style }

    return (
        isOwner && 
        <div style={styleIcon}>
            <IconButton
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size='small'
            >
                <MoreVert fontSize='small' />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{ "& li": { gap: 1 } }}
            >
                <MenuItem onClick={handleClose}><Edit /> Edit</MenuItem>
                <MenuItem onClick={handleDelete}>
                    {loadingDelete ? <CircularProgress size={20} /> : <Delete />} Delete
                </MenuItem>
            </Menu>
        </div>
    );
}