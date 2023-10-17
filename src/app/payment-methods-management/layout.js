"use client"
import PageLayout from '@/components/PageLayout'

export default function Layout({ children }) {
    return <PageLayout thisProtectedPage title="Payment Methods Management" maxWidth="md">{children}</PageLayout>
}