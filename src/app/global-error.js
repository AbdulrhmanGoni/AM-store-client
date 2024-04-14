'use client'
import { IllustrationCard } from "@abdulrhmangoni/am-store-library";

export default function GlobalError() {
    return (
        <html>
            <body>
                <IllustrationCard
                    illustratorType="unexpected"
                    fullPage
                    title="Unexpected Error"
                    alertType="error"
                    message="It may happened because of your internet or It server error, refresh to try again or close the application and come back later."
                    withRefreshButton
                    disableHeight
                />
            </body>
        </html>
    )
}