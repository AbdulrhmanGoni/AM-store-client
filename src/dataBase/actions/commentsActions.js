import customFetch from "../../functions/customFetch";
import { loadingControl } from '@abdulrhmangoni/am-store-library';

const path = productId => `products/${productId}/comments`

export async function addComment(comment) {
    loadingControl(true);
    const theComment = await customFetch(path(comment.productId), "POST", { comment, type: "newComment" });
    loadingControl(false);
    return theComment
}

export async function addReply(comment, replyTo) {
    loadingControl(true);
    const theReply = await customFetch(path(comment.productId), "POST", { comment, type: "reply", replyTo });
    loadingControl(false);
    return theReply;
}

export async function deleteComment(toDelete) {
    return await customFetch(path(toDelete.productId), "DELETE", toDelete);
}

export async function setLikeOrDislike(action) {
    return await customFetch(path(action.productId), "POST", { action, type: "like||dislike" });
}

export async function getReplies({ commentId, productId }) {
    return await customFetch(path(productId) + `?get=replies&commentId=${commentId}`);
}
