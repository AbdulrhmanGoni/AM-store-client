import { Reply } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, List, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteComment, getReplies } from '../dataBase/actions/commentsActions';
import { useParams } from 'react-router-dom';
import { useSpeedMessage } from '../hooks/useSpeedMessage';
import CommentOptionsMenu from './CommentOptionsMenu';
import ReplyViewer from './ReplyViewer';
import Comment from './Comment';
import useLikesAndDislikes from '../hooks/useLikesAndDislikes';
import waitFor from '../functions/waitFor';
import useReplyField from '../hooks/useReplyField';


const CommentViewer = ({
    commenterData: { userName, avatar },
    text, commenterId, commentId, likes,
    dislikes, timeAgo, replies, setChanges, isNewComment
}) => {

    const { id: productId } = useParams();
    const { userData } = useSelector(state => state);
    const userId = userData ? userData._id : null
    const { message } = useSpeedMessage();
    const { LikeButton, DislikeButton } = useLikesAndDislikes({
        initialLikes: likes.length,
        initialDislikes: dislikes.length,
        isLikesCondetion: likes.includes(userId),
        isDislikesCondetion: dislikes.includes(userId),
        actionInfo: { productId, commentId, userId }
    })

    const [repliesListIsOpen, setRepliesListState] = useState(false);
    const [repliesList, setReplies] = useState([]);
    const [repliesCount, setRepliesCount] = useState(replies.length);
    const [addCommentBehavior, setAddCommentBehavior] = useState(isNewComment ? "-100%" : "0%");
    const [deleteCommentBehavior, setDeleteCommentBehavior] = useState(false);
    const [deleteReplyBehavior, setDeleteReplyBehavior] = useState(false);

    async function deleteCommentFunc(target) {
        const res = await deleteComment(target);
        if (res) {
            if (target.type === "reply") {
                setDeleteReplyBehavior(res.commentId);
                waitFor(0.5).then(() => setReplies(replies => replies.filter(reply => reply._id !== res.commentId)));
                setRepliesCount(currentCount => --currentCount);
            } else {
                setDeleteCommentBehavior(res.commentId);
                waitFor(0.5)
                    .then(() => setChanges(comments => comments.filter(comment => comment._id !== res.commentId)));
            }
        } else if (res === false) {
            message("Failed delete", "error");
        } else message("Server Error", "error");
    }

    function openrepliesList() {
        if (!repliesListIsOpen) {
            setRepliesListState("loading");
            getReplies({ commentId, productId })
                .then(replies => {
                    if (replies) {
                        setReplies(replies);
                        setRepliesListState(true);
                    }
                }).catch(() => setRepliesListState("error"))
        } else setRepliesListState(false);
    }

    function handleAddReplyLocaly(newReply) {
        setReplies(state => [newReply, ...state]);
        setRepliesCount(currentCount => ++currentCount);
        if (!repliesListIsOpen) {
            openrepliesList();
        }
    }

    const textFieldProps = {
        id: commentId,
        name: commentId,
        label: "What is your reply to this comment",
        variant: 'outlined',
        size: 'small',
        fullWidth: true
    }
    const replyData = {
        commenterId: userId,
        commenterData: {},
        productId
    }
    const { TextFieldComponent, toggleTextFieldState, textFieldIsOpen } = useReplyField({
        textFieldProps,
        disabledBtn: !userId,
        replyData,
        replyPlace: commentId,
        handleAddReplyLocaly
    })

    useEffect(() => {
        if (deleteCommentBehavior) setAddCommentBehavior("-100%");
    }, [deleteCommentBehavior]);

    useEffect(() => {
        if (isNewComment) { setAddCommentBehavior("0%") };
    }, []);

    useEffect(() => {
        if (!repliesList.length) { setRepliesListState(false); };
    }, [repliesList]);

    return (
        <Box sx={{ overflow: "hidden", p: "1px" }}>
            <Paper elevation={1} sx={{
                p: "14px 8px",
                display: "flex",
                gap: 1,
                position: "relative",
                flexDirection: "column",
                transition: ".4s",
                transform: `translateX(${addCommentBehavior})`
            }}>
                <Comment userName={userName} avatar={avatar} timeAgo={timeAgo} text={text}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                            <CommentOptionsMenu
                                isOwner={userId === commenterId}
                                deleteFun={() => deleteCommentFunc({ productId, commentId, commenterId })}
                            />
                        </Box>
                        {
                            repliesCount ?
                                <Button
                                    size='small'
                                    onClick={openrepliesList}
                                    sx={{ width: "fit-content" }}
                                >
                                    {repliesCount} {repliesCount > 1 ? "Replies" : "Reply"}
                                </Button> : null
                        }
                    </Box>
                </Comment>
            </Paper>
            {
                (repliesListIsOpen || textFieldIsOpen) &&
                <Box sx={{ m: "5px 0px 0px 20px", p: "4px", overflow: "visible", position: "relative", "&:before": beforeStyle }}>
                    <TextFieldComponent style={{ mb: 1 }} />
                    {
                        repliesListIsOpen === "loading" ? <CircularProgress size={30} sx={{ m: "20px auto" }} /> :
                            repliesListIsOpen === "error" ? <Alert severity='error'>Failed to fetch replies</Alert> :
                                repliesListIsOpen === true ?
                                    <List sx={{ gap: "5px", display: "flex", flexDirection: "column", p: 0 }}>
                                        {repliesList.map((reply) => {
                                            return <ReplyViewer
                                                reply={reply}
                                                replyPlace={commentId}
                                                handleAddReplyLocaly={handleAddReplyLocaly}
                                                deleteComment={deleteCommentFunc}
                                                deleteReplyBehavior={deleteReplyBehavior}
                                                key={reply._id}
                                            />
                                        })}
                                    </List> : null
                    }
                </Box>
            }
        </Box>
    );

}

const beforeStyle = {
    content: "' '",
    position: "absolute",
    left: -12, top: 0,
    width: "3px", height: "100%",
    bgcolor: "primary.main",
    zIndex: 100
}


export default CommentViewer;
