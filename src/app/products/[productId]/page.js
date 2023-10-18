import ProductDetails from "@/components/ProductDetails"
import serverFetch from "@/functions/serverFetch"


export default async function Page({ params: { productId } }) {

    try {
        const data = await serverFetch(`products/${productId}`)
        return <ProductDetails product={data} />
    } catch (error) {
        console.log(error)
        return <h1>Error</h1>
    }
}