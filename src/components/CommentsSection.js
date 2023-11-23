"use client"
import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, IconButton, List, Typography } from '@mui/material';
import CommentViewer from './CommentViewer';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import TextFieldWithImojis from './TextFieldWithImojis';
import { Refresh } from '@mui/icons-material';
import useProductsCommentsActions from '@/hooks/useProductsCommentsActions';


const CommentsSection = () => {

    const userData = useSelector(state => state.userData);
    const { message } = useSpeedMessage();
    const { addComment, getProductComments } = useProductsCommentsActions();
    const [commentsOpened, setCommentsOpened] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [thereIsNoMore, setThereIsNoMore] = useState(false);
    const [sliceNumber, setSliceNumber] = useState(1);
    const [newCommentsList, setNewCommentsList] = useState([]);
    const [addingLoading, setAddingLoading] = useState(false);

    function getCommentsSlice(sliceNumber) {
        setIsLoading(true);
        getProductComments(sliceNumber)
            .then(({ comments, thereIsMore }) => {
                !thereIsMore && setThereIsNoMore(true);
                if (comments?.length) {
                    setComments(state => [...state, ...comments.filter(com => !newCommentsList.includes(com.id))])
                    setSliceNumber(state => ++state);
                    isError && setIsError(false);
                }
            })
            .catch(() => setIsError(true))
            .finally(() => { setIsLoading(false) })
    }

    function getNextPage() { getCommentsSlice(sliceNumber) }

    function openCommentsSection() {
        getCommentsSlice(sliceNumber);
        setCommentsOpened(true);
    }

    async function handleAddComment(comment, clearField) {
        if (comment) {
            const commentData = {
                commenterId: userData._id,
                text: comment
            }
            setAddingLoading(true)
            addComment(commentData)
                .then(commentId => {
                    setComments(comments => [
                        {
                            ...commentData,
                            id: commentId,
                            commenterData: {
                                userName: userData.userName,
                                avatar: userData.avatar
                            },
                            createdAt: new Date().toISOString(),
                            likes: [],
                            dislikes: [],
                            isNewComment: true
                        },
                        ...comments
                    ]);
                    setNewCommentsList(theList => [commentId, ...theList]);
                    clearField();
                    if (!commentsOpened) {
                        setCommentsOpened(true);
                        getNextPage()
                    }
                })
                .catch(() => message("adding comment falied for unexected error!"))
                .finally(() => setAddingLoading(false))
        }
    }

    return (
        <Box className="flex-column-center gap1 full-width" p="40px 0px">
            <TextFieldWithImojis
                placeholder="What is your opinion about this product"
                handleSubmit={handleAddComment}
                Loading={addingLoading}
            />
            {
                commentsOpened &&
                <>
                    {
                        comments.length ?
                            <List sx={{ gap: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                                {
                                    comments.map(comment => {
                                        return <CommentViewer
                                            key={comment.id}
                                            theComment={comment}
                                            commenterData={comment.commenterData}
                                            setChanges={setComments}
                                        />
                                    })
                                }
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
                        : !thereIsNoMore && commentsOpened ? <Button onClick={getNextPage} variant='contained'>View more</Button> : null
            }
            {!commentsOpened && <Button sx={{ m: "30px 0px" }} onClick={openCommentsSection} variant='contained'>Open Comments</Button>}
        </Box>
    );
}

export default CommentsSection;
