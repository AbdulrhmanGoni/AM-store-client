import PageLayout from '@/components/PageLayout'

export default function layout({ children }) {
    return <PageLayout signUpRequired title="Profile" maxWidth="md">{children}</PageLayout>
}