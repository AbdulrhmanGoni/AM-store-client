import SectionTitle from '../SectionTitle';
import Image from "next/image";
import serverAction from '@/utilities/serverAction';
import BestProductsSlideUI from './BestProductsSlideUI';

export default async function BestProductsSlide() {

    try {
        const products = await serverAction("products/top-products?sort=earnings&limit=10");
        return <ProductsSlide products={products} />
    } catch {
        return <ProductsSlide error={true} />
    }

    function ProductsSlide({ products, error }) {
        return (
            <SectionTitle
                style={{ padding: "20px 0px", minHeight: "310px" }}
                title="Best Selling"
                icon={
                    <Image
                        src="/best-seller.png"
                        alt={"Best Selling Icon"}
                        width={30} height={30}
                    />
                }
            >
                <BestProductsSlideUI products={products} error={error} />
            </SectionTitle>
        )
    }

}
