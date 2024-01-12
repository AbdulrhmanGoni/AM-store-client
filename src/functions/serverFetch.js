import { host } from "@/CONSTANT/hostName";
import { cookies } from "next/headers";

export default async function serverFetch(path) {

    const accessToken = cookies().get("access-token")?.value
    const tokenId = cookies().get("userId")?.value

    const requestPayload = {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${accessToken}`,
            'token-id': tokenId,
            'content-type': 'application/json',
        },
        cache: 'no-store'
    }

    return (await fetch(`${host}/${path ?? ""}`, requestPayload)).json()
}
