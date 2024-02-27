import customFetch from "@/utilities/customFetch";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import { useParams } from "next/navigation";


export default function useProductsCommentsActions() {

    const { productId } = useParams();
    const path = `products/${productId}/comments`;

    async function getProductComments(sliceNumber) {
        return await customFetch(path + `?sliceNumber=${sliceNumber}&sliceSize=10`);
    }

    async function addComment(comment) {
        return await customFetch(path + "?type=newComment", "POST", { comment });
    }

    async function deleteComment({ commentId, commenterId }) {
        loadingControl(true)
        const res = await customFetch(path, "DELETE", { commentId, commenterId });
        loadingControl(false)
        return res
    }

    async function setLikeOrDislike(action) {
        return await customFetch(path, "PUT", action);
    }

    return {
        getProductComments,
        addComment,
        setLikeOrDislike,
        deleteComment,
        path
    }
}
