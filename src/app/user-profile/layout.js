import PageLayout from '@/components/PageLayout'

export default function layout({ children }) {
    return <PageLayout thisProtectedPage title="Profile" maxWidth="md">{children}</PageLayout>
}