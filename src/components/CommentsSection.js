import { Alert, Box, Button, CircularProgress, List, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { host } from '../CONSTANT/hostName';
import CommentViewer from './CommentViewer';
import { addComment } from '../dataBase/actions/commentsActions';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from '../hooks/useSpeedMessage';
import { Send } from '@mui/icons-material';


const CommentsSection = () => {
    const { id } = useParams();
    const { userData } = useSelector(state => state);
    const { data: comments, setData, isLoading, isError } = useFetch(`products/${id}/comments`, []);
    const { message } = useSpeedMessage();

    async function handleAddComment(ev) {
        ev.preventDefault();
        const theComment = document.getElementById("commentField");
        if (theComment) {
            const commentData = {
                productId: id,
                commenterId: userData._id,
                commenterData: {},
                text: theComment.value
            }
            addComment(commentData)
                .then(newComment => {
                    if (newComment) {
                        setData(comments => [newComment, ...comments]);
                        theComment.value = ""
                    } else message("adding comment falied");
                });
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Box component="form" onSubmit={handleAddComment} sx={{ display: "flex", alignItems: "flex-end", gap: 1, width: "100%" }}>
                <TextField id='commentField' name='commentField' label="What is your openion in this products" variant='standard' fullWidth />
                <Button
                    variant='contained'
                    size='small'
                    endIcon={<Send />}
                    type='submit'
                    disabled={!userData}
                >
                    Send
                </Button>
            </Box>
            {
                isLoading ? <Box sx={{ m: "30px 0px" }}> <CircularProgress /> </Box> :
                    isError ? <Alert sx={{ m: "0px auto" }} severity='error'>Falied to fetch comments</Alert> :
                        comments.length ?
                            <List sx={{ gap: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                                {comments.map(comment => {
                                    return <CommentViewer
                                        key={comment._id}
                                        commentId={comment._id}
                                        text={comment.text}
                                        timeAgo={comment.timeAgo}
                                        commenterId={comment.commenterId}
                                        commenterData={comment.commenterData}
                                        likes={comment.likes}
                                        dislikes={comment.dislikes}
                                        replies={comment.replies}
                                        isNewComment={comment.isNewComment}
                                        setChanges={setData}
                                    />
                                })}
                            </List> :
                            <Typography variant='h6' sx={{ p: "20px 8px", m: "0px auto" }}>There are no comments for this product</Typography>
            }
        </Box>
    );
}

export default CommentsSection;
