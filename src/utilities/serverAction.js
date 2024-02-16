"use server"
import { host } from "@/CONSTANTS/hostName"
import { cookies } from "next/headers";

export default async function serverAction(path) {

    const accessToken = cookies().get("access-token")?.value
    const tokenId = cookies().get("userId")?.value

    const requestOptions = {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${accessToken}`,
            'token-id': tokenId,
            'content-type': 'application/json',
        },
        cache: 'no-store'
    }

    return (await fetch(`${host}/${path ?? ""}`, requestOptions)).json()
}
