"use client"
import { ErrorThrower } from '@abdulrhmangoni/am-store-library'

export default function error() {
    return (
        <Unexpected  />
    )
}


function NotFound({ productId }) {
    return <ErrorThrower
        message={`We Couldn't Found Product with id: '${productId}'`}
        title="404 Not Found"
        illustratorType="notFound"
    />
}

function Unexpected() {
    return <ErrorThrower
        illustratorType="unexpected"
        title="Unexpected Error"
        message='There are unexpected error, check your internet or refresh the page'
        withRefreshButton
    />
}