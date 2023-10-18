import PageLayout from '@/components/PageLayout'

export default function Layout({ children }) {

    return (
        <PageLayout
            thisProtectedPage
            redirect="/shopping-cart"
            title="Checkout"
            maxWidth="lg"
        >
            {children}
        </PageLayout>
    )
}