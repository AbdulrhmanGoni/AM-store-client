import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useProductsSearchParams() {

    const { replace } = useRouter();
    const currentSearchParams = useSearchParams();
    const currentPath = usePathname();

    function setParam(name, value) {
        if (name) {
            const newSearchParams = new URLSearchParams(currentSearchParams);
            if (currentSearchParams.get(name) !== value) {
                newSearchParams.set(name, value)
                replace(currentPath + '?' + newSearchParams.toString())
            }
        }
    }

    function removeParam(name) {
        const newSearchParams = new URLSearchParams(currentSearchParams);
        newSearchParams.delete(name)
        replace(currentPath + '?' + newSearchParams.toString())
    }

    return {
        setParam,
        getParam: (name) => currentSearchParams.get(name),
        removeParam,
        currentPath,
        currentSearchParams
    }
}
