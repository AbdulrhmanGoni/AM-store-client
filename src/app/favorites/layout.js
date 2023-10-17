import PageLayout from '@/components/PageLayout'

export default function layout({ children }) {
    return <PageLayout title="Favorite" maxWidth="md">{children}</PageLayout>
}
