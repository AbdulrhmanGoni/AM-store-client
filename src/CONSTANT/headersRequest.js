import cookiesParser from "../functions/cookiesParser";

export default function headersRequest(method, body) {
    const accessToken = cookiesParser().find(cookie => cookie.key === "access-token")?.value
    const tokenId = cookiesParser().find(cookie => cookie.key === "userId")?.value
    return {
        headers: {
            'access-token': accessToken,
            'token-id': tokenId,
            'content-type': 'application/json',
        },
        method: method ?? "GET",
        body: body ? JSON.stringify(body) : undefined
    }
} 
