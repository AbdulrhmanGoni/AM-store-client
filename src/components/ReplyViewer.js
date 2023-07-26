import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import useLikesAndDislikes from '../hooks/useLikesAndDislikes';
import { useParams } from 'react-router-dom';
import CommentOptionsMenu from './CommentOptionsMenu';
import { Reply } from '@mui/icons-material';
import useReplyField from '../hooks/useReplyField';

const ReplyViewer = ({
    reply: {
        commenterData: { userName, avatar },
        targetData,
        text, commenterId, _id, likes,
        dislikes, timeAgo, isNewReply
    }, replyPlace, handleAddReplyLocaly, deleteComment, deleteReplyBehavior }) => {


    const { id: productId } = useParams();
    const { userData } = useSelector(state => state);
    const userId = userData ? userData._id : null

    const { LikeButton, DislikeButton } = useLikesAndDislikes({
        initialLikes: likes.length,
        initialDislikes: dislikes.length,
        isLikesCondetion: likes.includes(userId),
        isDislikesCondetion: dislikes.includes(userId),
        actionInfo: { productId, commentId: _id, userId, replyPlace, type: "reply" }
    });

    const textFieldProps = {
        id: _id,
        name: _id,
        label: "What is your reply to this comment",
        variant: 'outlined',
        size: 'small',
        fullWidth: true
    }
    const replyData = {
        commenterId: userId,
        commenterData: {},
        targetId: commenterId,
        targetData: {},
        productId
    }
    const { TextFieldComponent, toggleTextFieldState } = useReplyField({
        textFieldProps,
        disabledBtn: !userId,
        replyData,
        replyPlace,
        handleAddReplyLocaly
    })
    const [addReplyBehavior, setAddReplyBehavior] = useState(isNewReply ? "-100%" : "0%");

    useEffect(() => {
        if (deleteReplyBehavior === _id) setAddReplyBehavior("-100%");
    }, [deleteReplyBehavior]);

    useEffect(() => {
        if (isNewReply) { setAddReplyBehavior("0%") };
    }, []);

    return (
        <Box sx={{ overflow: "hidden", gap: 1, p: "1px", display: "flex", flexDirection: "column" }}>
            <Paper
                elevation={1}
                sx={{
                    p: "14px 8px",
                    display: "flex",
                    gap: 1,
                    position: "relative",
                    "&:before": commentPoint,
                    "&:after": commentLine,
                    transition: ".4s",
                    transform: `translateX(${addReplyBehavior})`
                }}>
                <Comment
                    userName={userName}
                    avatar={avatar}
                    timeAgo={timeAgo}
                    text={text}
                    targetReply={targetData ? targetData.userName : undefined}
                >
                    <Box sx={{ display: "flex" }}>
                        <LikeButton />
                        <DislikeButton />
                        <Button
                            aria-label='reply button'
                            variant='text'
                            size='small'
                            sx={{ ml: 1 }}
                            onClick={toggleTextFieldState}
                            endIcon={<Reply />}
                        >
                            Reply
                        </Button>
                    </Box>

                    <CommentOptionsMenu
                        isOwner={userId === commenterId}
                        deleteFun={() => deleteComment({ productId, commentId: _id, commenterId, replyPlace, type: "reply" })}
                    />
                </Comment>
            </Paper>
            <TextFieldComponent />
        </Box>
    );
}

// let top = "48px";

const commentPoint = {
    // content: "' '",
    // position: "absolute",
    // borderRadius: "50%",
    // left: -25, top,
    // transform: "translateY(-50%)",
    // width: "13px", height: "13px",
    // bgcolor: "white",
    // zIndex: 200
}
const commentLine = {
    // content: "' '",
    // position: "absolute",
    // left: -23, top,
    // transform: "translateY(-50%)",
    // width: "24px", height: "3px",
    // bgcolor: "primary.main",
    // zIndex: -5
}

export default ReplyViewer;
