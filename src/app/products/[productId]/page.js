import ProductDetails from "@/components/productsRelatedComponents/ProductDetails"
import serverFetch from "@/utilities/serverFetch"
import { Unexpected, NotFound } from "./error"

export default async function Page({ params: { productId } }) {
    try {
        const response = await serverFetch(`products/${productId}`);
        return response == null ? <NotFound productId={productId} />
            : response ? <ProductDetails product={response} />
                : <Unexpected />
    } catch {
        return <Unexpected />
    }
}