import SessionData from "@/state-management/sessionData";
import serverAction from "@/utilities/serverAction";
import { useHTTPRequestState } from "@abdulrhmangoni/am-store-library";

let loadedSliders = {};

const SLIDER_EXPIREATION_DATE = 1000 * 60 * 5; // 5 minutes

function isSliderStillValid(sliderUrl) {
    let slider = loadedSliders[sliderUrl];
    if (!slider) return false;
    const isStillValid = (new Date().getTime() - slider.date) < SLIDER_EXPIREATION_DATE;
    if (isStillValid && slider.loaded) {
        return true
    } else {
        slider = { loaded: false, date: null }
        return false
    }

}

export default function useHomePageSlidersLogic(url, options) {

    const {
        data: products,
        setData: setProducts,
        isLoading,
        isError,
        setIsLoading,
        setIsError,
        isSuccess,
        setIsSuccess
    } = useHTTPRequestState(
        options?.initialProducts || [],
        {
            initialError: options?.initialError,
            initialSuccess: options?.initialSuccess
        }
    )

    function fetchProducts() {
        if (isSliderStillValid(url)) {
            const products = SessionData.getData(url);
            setProducts(products);
            setIsSuccess(true);
        } else {
            setIsLoading(true);
            serverAction(url)
                .then((products) => {
                    setIsSuccess(true);
                    setProducts(products);
                    isError && setIsError(false);
                    SessionData.setData(url, products, { expirationDate: SLIDER_EXPIREATION_DATE });
                    loadedSliders[url] = {
                        loaded: true,
                        date: new Date().getTime()
                    };
                })
                .catch(() => {
                    setIsError(true);
                    setIsSuccess(false);
                })
                .finally(() => setIsLoading(false))
        }
    }

    return {
        products,
        isLoading,
        isError,
        fetchSuccess: isSuccess,
        fetchProducts
    }
}
