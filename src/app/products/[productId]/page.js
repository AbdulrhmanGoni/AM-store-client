import ProductDetails from "@/components/ProductDetails"
import serverFetch from "@/functions/serverFetch"
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