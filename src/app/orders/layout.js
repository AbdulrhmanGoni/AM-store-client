"use client"
import PageLayout from '@/components/PageLayout'

export default function Layout({ children }) {
    return <PageLayout signUpRequired title="Orders" maxWidth="lg">{children}</PageLayout>
}