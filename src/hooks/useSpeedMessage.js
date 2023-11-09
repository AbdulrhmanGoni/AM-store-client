import { useSnackbar } from 'notistack';
export function useSpeedMessage() {

    const { enqueueSnackbar } = useSnackbar();

    function message(message, type = "error", autoHideDuration = 5000) {
        enqueueSnackbar(message, {
            variant: type,
            autoHideDuration,
            style: { fontFamily: "roboto" }
        });
    }

    return { message };
}