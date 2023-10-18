import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useProductsSearchParams() {

    const { push } = useRouter();
    const currentSearchParams = useSearchParams();
    const currentUrl = usePathname();

    function setParam(name, value) {
        if (name) {
            const newSearchParams = new URLSearchParams(currentSearchParams);
            newSearchParams.set(name, value)
            push(currentUrl + '?' + newSearchParams.toString())
        }
    }

    function removeParam(name) {
        const newSearchParams = new URLSearchParams(currentSearchParams);
        newSearchParams.delete(name)
        push(currentUrl + '?' + newSearchParams.toString())
    }

    return {
        setParam,
        getParam: (name) => currentSearchParams.get(name),
        removeParam
    }
}
