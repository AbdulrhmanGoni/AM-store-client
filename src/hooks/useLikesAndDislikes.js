import { cloneElement, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ThumbDown, ThumbDownOffAlt, ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import useProductsCommentsActions from './useProductsCommentsActions';

const CommentActions = ({ onClick, actionType, value, icon }) => {

    return (
        <Button
            onClick={() => onClick(actionType)}
            sx={{ p: 0 }}
            endIcon={cloneElement(icon, { fontSize: 'small' })}
            variant=''
        >
            <span style={{ fontSize: 12 }}>{value}</span>
        </Button>
    );
}

const useLikesAndDislikes = (props) => {

    const {
        initialLikes,
        initialDislikes,
        isLikesCondetion,
        isDislikesCondetion,
        actionInfo
    } = props;

    const { setLikeOrDislike } = useProductsCommentsActions();
    const [likesState, setLikesState] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes ?? 0);
    const [dislikesState, setDisLikesState] = useState(false);
    const [dislikesCount, setDisLikesCount] = useState(initialDislikes ?? 0);

    function handleLikeState(type) {
        if (type === "init") {
            setLikesState(true);
            setDisLikesState(false);
        } else if (type === "action" || !type) {
            if (likesState) {
                setLikesCount(currentCount => --currentCount);
                setLikesState(false);
            } else {
                if (dislikesState) {
                    setDisLikesCount(currentCount => --currentCount);
                    setDisLikesState(false);
                }
                setLikesCount(currentCount => ++currentCount);
                setLikesState(true);
            }
        }
    }

    function handleDislikeikeState(type) {
        if (type === "init") {
            setDisLikesState(true);
            setLikesState(false);
        } else if (type === "action" || !type) {
            if (dislikesState) {
                setDisLikesCount(currentCount => --currentCount);
                setDisLikesState(false);
            } else {
                if (likesState) {
                    setLikesCount(currentCount => --currentCount);
                    setLikesState(false);
                }
                setDisLikesCount(currentCount => ++currentCount);
                setDisLikesState(true);
            }
        }
    }

    function likeAndDislikeAction(actionType, undo) {
        if (actionInfo.userId) {
            setLikeOrDislike({ actionType, ...actionInfo, undo });
        }
        if (actionType === "like") {
            handleLikeState("action");
        }
        else if (actionType === "dislike") {
            handleDislikeikeState("action");
        }
    }

    useEffect(() => {
        if (isLikesCondetion || likesState) {
            handleLikeState("init");
        }
        else if (isDislikesCondetion || dislikesState) {
            handleDislikeikeState("init");
        }
    }, []);

    const LikeButton = () => {
        return (
            <CommentActions
                onClick={() => likeAndDislikeAction("like", likesState)}
                value={likesCount}
                icon={likesState ? <ThumbUp /> : <ThumbUpOffAlt />}
            />
        )
    }

    const DislikeButton = () => {
        return (
            <CommentActions
                onClick={() => likeAndDislikeAction("dislike", dislikesState)}
                value={dislikesCount}
                icon={dislikesState ? <ThumbDown /> : <ThumbDownOffAlt />}
            />
        )
    }

    return {
        likesCount,
        likesState,
        dislikesCount,
        dislikesState,
        LikeButton,
        DislikeButton
    }
}

export default useLikesAndDislikes;
