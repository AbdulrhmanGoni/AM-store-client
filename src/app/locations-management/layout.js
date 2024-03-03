import PageLayout from '@/components/PageLayout'

export default function layout({ children }) {
    return <PageLayout signUpRequired title="Locations Management" maxWidth="md">{children}</PageLayout>
}
