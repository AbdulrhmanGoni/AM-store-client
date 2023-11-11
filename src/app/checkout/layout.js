"use client"
import PageLayout from '@/components/PageLayout'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {

    const { replace } = useRouter();
    const [allowRender, setAllowRender] = useState(false);
    const shoppingCart = useSelector(state => state.shoppingCart);

    useEffect(() => {
        if (shoppingCart?.length > 0) setAllowRender(true);
        else replace("/shopping-cart");
    }, [replace, shoppingCart]);

    return (
        allowRender &&
        <PageLayout
            signUpRequired
            redirect="/shopping-cart"
            title="Checkout"
            maxWidth="lg"
        >
            {children}
        </PageLayout>
    )
}