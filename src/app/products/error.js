"use client"
import { IllustrationCard } from '@abdulrhmangoni/am-store-library'
import { Button } from '@mui/material'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <IllustrationCard
            title="Something Went Wrong!"
            illustratorType="unexpected"
            hideAlertMsg
            disableHeight
        >
            <Button
                variant='contained'
                onClick={() => reset()}
            >
                Try again
            </Button>
        </IllustrationCard>
    )
}

export function NotFound() {
    return <IllustrationCard
        title="No Results"
        illustratorType="notFound"
        hideAlertMsg
        disableHeight
    />
}
