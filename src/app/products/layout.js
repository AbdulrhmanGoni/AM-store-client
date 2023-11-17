"use client"
import PageLayout from '@/components/PageLayout'
export { LoadingCircle } from '@abdulrhmangoni/am-store-library';

export default function ProductsLayout({ children }) {
    return <PageLayout title="Products" maxWidth="lg">{children}</PageLayout>
}

