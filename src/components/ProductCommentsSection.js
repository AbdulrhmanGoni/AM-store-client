"use client"
import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, IconButton, List, Typography } from '@mui/material';
import CommentViewer from './CommentViewer';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import TextFieldWithImojis from './TextFieldWithImojis';
import { Refresh } from '@mui/icons-material';
import useProductsCommentsActions from '@/hooks/useProductsCommentsActions';
import { useWhenElementAppears } from '@abdulrhmangoni/am-store-library';
import useSlicedFetch from '@/hooks/useSlicedFetch';
import { useFetch } from '@/hooks/useFetch';
import { AlertTooltip } from '@abdulrhmangoni/am-store-library';


export default function ProductCommentsSection() {

    const userData = useSelector(state => state.userData);
    const { message } = useSpeedMessage();
    const { addComment, path } = useProductsCommentsActions();
    const [commentsOpened, setCommentsOpened] = useState(false);
    const [addingLoading, setAddingLoading] = useState(false);

    const {
        data: areUserCanComment,
        isError: checkingAreUserCanCommentError,
        refetch: retryCheckingAreUserCanComment,
        refetched: checkingAreUserCanCommentTries
    } = useFetch(path.replace("comments", "are-user-can-comment") + `?userId=${userData?._id}`);

    const {
        data,
        isLoading,
        isError,
        getNextSlice,
        addNewItem,
        deleteItem
    } = useSlicedFetch(path, { contentName: "comments", itemsIdPropertyName: "id" });

    useWhenElementAppears("last-comment-card", getNextSlice);

    function openCommentsSection() {
        getNextSlice()
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
                    const theNewComment = {
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
                    }
                    addNewItem(theNewComment, commentId);
                    clearField();
                    if (!commentsOpened) {
                        openCommentsSection();
                    }
                })
                .catch(() => message("adding comment falied for unexected error!"))
                .finally(() => setAddingLoading(false))
        }
    }

    useEffect(() => {
        if (checkingAreUserCanCommentError && !areUserCanComment && checkingAreUserCanCommentTries < 3) {
            retryCheckingAreUserCanComment();
        }
    }, [checkingAreUserCanCommentTries, checkingAreUserCanCommentError, areUserCanComment, retryCheckingAreUserCanComment]);

    return (
        <Box className="flex-column-center gap1 full-width" p="40px 0px">
            <AlertTooltip
                type="info"
                title='Only who has bought this product before can let comment'
            >
            <TextFieldWithImojis
                placeholder="What is your opinion about this product"
                handleSubmit={handleAddComment}
                Loading={addingLoading}
                disabled={!areUserCanComment}
            />
            </AlertTooltip>
            {
                commentsOpened &&
                <>
                    {
                        data.length ?
                            <List className='flex-column gap1 full-width'>
                                {
                                    data.map((comment, index) => {
                                        return <CommentViewer
                                            key={comment.id}
                                            cardId={data.length - 1 === index ? "last-comment-card" : undefined}
                                            theComment={comment}
                                            commenterData={comment.commenterData}
                                            deleteTheComment={() => deleteItem(comment.id)}
                                        />
                                    })
                                }
                            </List>
                            : isLoading || isError ? null
                                : data && <Typography variant='h6' sx={{ p: "20px 8px", m: "0px auto" }}>
                                    There are no comments for this product
                                </Typography>
                    }
                </>
            }
            {
                isLoading ? <Box sx={{ my: 3 }}><CircularProgress /></Box>
                    : isError ?
                        <Alert
                            action={<IconButton onClick={getNextSlice}><Refresh /></IconButton>}
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