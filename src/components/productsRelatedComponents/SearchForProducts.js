"use client"
import { host } from '@/CONSTANTS/hostName';
import useProductsSearchParams from '@/hooks/useProductsSearchParams';
import { SearchForProductsField } from '@abdulrhmangoni/am-store-library'
import { ReadMore } from '@mui/icons-material'
import { useSearchParams, useRouter } from 'next/navigation';


export default function SearchForProducts() {

    const { push } = useRouter();
    const params = useSearchParams();
    const { setParam, getParam } = useProductsSearchParams();

    return (
        <SearchForProductsField
            hostName={host}
            endItemIcon={<ReadMore />}
            actionWithProductId={(id) => { push(`products/${id}`) }}
            disableResultsList
            additionalFilter={params.get("category")}
            defaultValue={params.get("title")}
            onEnter={(searchInput) => {
                searchInput !== getParam("title") && setParam("title", searchInput)
            }}
        />
    )
}
