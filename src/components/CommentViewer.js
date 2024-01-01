import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import CommentOptionsMenu from './CommentOptionsMenu';
import useLikesAndDislikes from '@/hooks/useLikesAndDislikes';
import waitFor from '@/functions/waitFor';
import useProductsCommentsActions from '@/hooks/useProductsCommentsActions';
import { timeAgo, MessageCard } from '@abdulrhmangoni/am-store-library';

export default function CommentViewer({ commenterData: { userName, avatar }, theComment, deleteTheComment, cardId }) {

    const { text, commenterId, id: commentId, likes, dislikes, createdAt, isNewComment } = theComment;

    const { id: productId } = useParams();
    const { deleteComment } = useProductsCommentsActions(productId);
    const userId = useSelector(state => state.userData?._id);
    const { message } = useSpeedMessage();
    const { LikeButton, DislikeButton } = useLikesAndDislikes({ likes, dislikes, productId, commentId });

    const [commentCardBehavior, setCommentCardBehavior] = useState(isNewComment ? "-100%" : "0%");
    const [deleteCommentBehavior, setDeleteCommentBehavior] = useState(false);

    async function deleteCommentFunc({ commentId, commenterId }) {
        deleteComment({ commentId, commenterId })
            .then(() => {
                setDeleteCommentBehavior(commentId);
                waitFor(0.5)
                    .then(deleteTheComment);
            })
            .catch(() => message("Failed delete", "error"))
    }

    useEffect(() => { deleteCommentBehavior && setCommentCardBehavior("-200%") }, [deleteCommentBehavior]);
    useEffect(() => { isNewComment && setCommentCardBehavior("0%") }, []);

    return (
        <MessageCard
            cardId={cardId}
            userName={userName}
            avatar={avatar}
            timeAgo={timeAgo(createdAt)}
            message={text}
            cardStyle={{
                position: "relative",
                transition: ".4s",
                transform: `translateX(${commentCardBehavior})`
            }}
        >
            <Box className="flex-column gap1">
                <Box sx={{ display: "flex" }}>
                    <LikeButton />
                    <DislikeButton />
                    <CommentOptionsMenu
                        isOwner={userId === commenterId}
                        deleteFun={() => deleteCommentFunc({ commentId, commenterId })}
                    />
                </Box>
            </Box>
        </MessageCard>
    );
}