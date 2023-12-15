"use client"
import { IllustrationCard } from '@abdulrhmangoni/am-store-library'

export default function error() {
    return (
        <Unexpected />
    )
}


export function NotFound({ productId }) {
    return <IllustrationCard
        message={`We Couldn't Found Product with id: '${productId}'`}
        title="404 Not Found"
        illustratorType="notFound"
    />
}

export function Unexpected() {
    return <IllustrationCard
        illustratorType="unexpected"
        title="Unexpected Error"
        message='There are unexpected error, check your internet or refresh the page'
        withRefreshButton
    />
}

export function ServerError() {
    return <IllustrationCard
        illustratorType="server"
        title="Server Error"
        message='There are unexpected error from the server, check your internet or refresh the page'
        withRefreshButton
    />
}