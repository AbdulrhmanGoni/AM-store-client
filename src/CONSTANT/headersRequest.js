import cookiesParser from "../functions/cookiesParser";

export default function headersRequest(method, body) {
    return {
        headers: {
            'access-token': cookiesParser().find(cookie => cookie.key === "access-token")?.value,
            'Content-Type': 'application/json',
        },
        method: method ?? "GET",
        body: body ? JSON.stringify(body) : undefined
    }
} 
