"use client"
import { ErrorThrower } from '@abdulrhmangoni/am-store-library'
import { Button } from '@mui/material'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
            <ErrorThrower
                title="Something Went Wrong!"
                illustratorType="unexpected"
                hideAlertMsg
                disableHeight
            >
                <Button
                    variant='contained'
                    onClick={ () => reset() }
                >
                    Try again
                </Button>
            </ErrorThrower>
    )
}

export function NotFound() {
    return <ErrorThrower
        title="No Results"
        illustratorType="notFound"
        hideAlertMsg
        disableHeight
    />
}
