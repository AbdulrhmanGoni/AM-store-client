import { useDispatch, useSelector } from 'react-redux';
import customFetch from '../functions/customFetch';
import { useSpeedMessage } from './useSpeedMessage';
import { setNewAvatar_localy } from '../dataBase/userData_slice';

export default function useImageUploader() {
    const userData = useSelector(state => state.userData);
    const { message } = useSpeedMessage();
    const dispatch = useDispatch();

    return (image) => customFetch(`users/${userData?._id}/upload-avatar`, "POST", { avatarUrl: image })
        .then(avatar => {
            message("Avatar Uploaded Successfully", "success");
            dispatch(setNewAvatar_localy(avatar));
            return avatar
        })
        .catch(() => { message("Unexpected error happened, Try Again", "error") })
}
