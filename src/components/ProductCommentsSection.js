"use client"
import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, IconButton, List, Typography } from '@mui/material';
import CommentViewer from './CommentViewer';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import TextFieldWithImojis from './TextFieldWithImojis';
import { Refresh } from '@mui/icons-material';
import useProductsCommentsActions from '@/hooks/useProductsCommentsActions';
import isElementInViewport from '@/functions/isElementInViewport';

export default function ProductCommentsSection() {
    
    const userData = useSelector(state => state.userData);
    const { message } = useSpeedMessage();
    const { addComment, getProductComments } = useProductsCommentsActions();
    const [commentsOpened, setCommentsOpened] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [thereIsNoMore, setThereIsNoMore] = useState(false);
    const [sliceNumber, setSliceNumber] = useState(0);
    const [newCommentsList, setNewCommentsList] = useState([]);
    const [addingLoading, setAddingLoading] = useState(false);

    function getNextPage() {
        !thereIsNoMore && setSliceNumber(state => ++state);
    }

    function openCommentsSection() {
        getNextPage()
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
                        openCommentsSection()
                    }
                })
                .catch(() => message("adding comment falied for unexected error!"))
                .finally(() => setAddingLoading(false))
        }
    }

    function appearingMonitor() {
        const targetElement = document.getElementById("last-comment-card");
        if (targetElement && isElementInViewport(targetElement)) {
            getNextPage()
            targetElement.removeAttribute("id")
        }
    }

    useEffect(() => {
        if (sliceNumber && !thereIsNoMore) {
            setIsLoading(true);
            getProductComments(sliceNumber)
                .then(({ comments, thereIsMore }) => {
                    !thereIsMore && setThereIsNoMore(true);
                    if (comments?.length) {
                        setComments(state => [...state, ...comments.filter(com => !newCommentsList.includes(com.id))])
                        isError && setIsError(false);
                    }
                })
                .catch(() => setIsError(true))
                .finally(() => { setIsLoading(false) })
        }
    }, [sliceNumber])

    useEffect(() => {
        window.addEventListener('scroll', appearingMonitor);
        window.addEventListener('resize', appearingMonitor);
        appearingMonitor();
    }, [thereIsNoMore])

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
                            <List className='flex-column gap1 full-width'>
                                {
                                    comments.map((comment, index) => {
                                        return <CommentViewer
                                            key={comment.id}
                                            cardId={comments.length - 1 === index ? "last-comment-card" : undefined}
                                            theComment={comment}
                                            commenterData={comment.commenterData}
                                            setChanges={setComments}
                                        />
                                    })
                                }
                            </List>
                            : isLoading ? null
                                : <Typography variant='h6' sx={{ p: "20px 8px", m: "0px auto" }}>
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
                        : null
            }
            {
                !commentsOpened &&
                <Button sx={{ m: "30px 0px" }} onClick={openCommentsSection} variant='contained'>
                    Open Comments
                </Button>
            }
        </Box>
    );
}