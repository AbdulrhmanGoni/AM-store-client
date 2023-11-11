import PageLayout from '@/components/PageLayout'

export default function Layout({ children }) {

    return (
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