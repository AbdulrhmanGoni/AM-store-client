import { useSnackbar } from 'notistack';
export function useSpeedMessage() {

    const { enqueueSnackbar } = useSnackbar();

    function message(message, type, auto_hide_duration) {
        enqueueSnackbar(message, {
            variant: type ?? "error",
            autoHideDuration: auto_hide_duration ?? 3000,
            style: { fontFamily: "roboto" }
        });
    }

    return { message };
}