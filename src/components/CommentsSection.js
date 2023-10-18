"use client"
import { Alert, Box, Button, CircularProgress, IconButton, List, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommentViewer from './CommentViewer';
import { addComment } from '@/dataBase/actions/commentsActions';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import TextFieldWithImojis from './TextFieldWithImojis';
import { useState } from 'react';
import customFetch from '@/functions/customFetch';
import { Refresh } from '@mui/icons-material';


const CommentsSection = () => {
    const { id } = useParams();
    const userData = useSelector(state => state.userData);
    const { message } = useSpeedMessage();
    const [commentsOpened, setCommentsOpened] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [thereIsMore, setisThereMore] = useState(true);
    const [sliceNumber, setSliceNumber] = useState(0);
    const [newCommentsList, setNewCommentsList] = useState([]);

    function getCommentsPage(sliceNumber) {
        setIsLoading(true);
        customFetch(`products/${id}/comments?sliceNumber=${sliceNumber}&sliceSize=10`)
            .then(({ comments, thereIsMore }) => {
                !thereIsMore && setisThereMore(false);
                if (comments) {
                    setComments(state => [...state, ...comments.filter(comm => !newCommentsList.includes(comm._id))])
                    setSliceNumber(state => ++state);
                    isError && setIsError(false);
                } else setIsError(true);
            })
            .catch(() => setIsError(true))
            .finally(() => { setIsLoading(false) })
    }

    function getNextPage() { getCommentsPage(sliceNumber) }

    function openCommentsSection() {
        getCommentsPage(sliceNumber);
        setCommentsOpened(true);
    }

    async function handleAddComment(theComment, clearField) {
        if (theComment) {
            const commentData = {
                productId: id,
                commenterId: userData._id,
                commenterData: {},
                text: theComment
            }
            addComment(commentData)
                .then(newComment => {
                    if (newComment) {
                        !commentsOpened && setCommentsOpened(true)
                        setComments(comments => [newComment, ...comments]);
                        setNewCommentsList(theList => [newComment._id, ...theList]);
                        clearField();
                    } else message("adding comment falied");
                });
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, p: "40px 0px" }}>
            <TextFieldWithImojis
                placeholder="What is your opinion about this product"
                handleSubmit={handleAddComment}
            />
            {
                commentsOpened &&
                <>
                    {
                        comments.length ?
                            <List sx={{ gap: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                                {comments.map(comment => {
                                    return <CommentViewer
                                        key={comment._id}
                                        theComment={comment}
                                        commenterData={comment.commenterData}
                                        setChanges={setComments}
                                    />
                                })}
                            </List>
                            : isLoading ? null
                                :
                                <Typography variant='h6' sx={{ p: "20px 8px", m: "0px auto" }}>
                                    There are no comments for this product
                                </Typography>
                    }
                </>
            }
            {
                isLoading ? <Box sx={{ m: "30px 0px" }}><CircularProgress /></Box>
                    : isError ?
                        <Alert
                            action={<IconButton onClick={getNextPage}><Refresh /></IconButton>}
                            sx={{ width: "100%" }}
                            severity='error'
                        >
                            Falied to fetch comments
                        </Alert>
                        : thereIsMore && commentsOpened ? <Button onClick={getNextPage} variant='contained'>View more</Button> : null
            }
            {!commentsOpened && <Button sx={{ m: "30px 0px" }} onClick={openCommentsSection} variant='contained'>Open Comments</Button>}
        </Box>
    );
}

export default CommentsSection;
