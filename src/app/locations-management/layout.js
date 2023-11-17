import PageLayout from '@/components/PageLayout'

export default function layout({ children }) {
    return <PageLayout signUpRequired title="Addresses Management" maxWidth="md">{children}</PageLayout>
}
