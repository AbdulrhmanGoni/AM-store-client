import PageLayout from '@/components/PageLayout'

export default function layout({ children }) {
    return <PageLayout thisProtectedPage title="Addresses Management" maxWidth="md">{children}</PageLayout>
}
