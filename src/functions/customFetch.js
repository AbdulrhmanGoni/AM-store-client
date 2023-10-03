import axios from "axios";
import { host } from "../CONSTANT/hostName";
import cookiesParser from "./cookiesParser";

export default async function customFetch(path, method, body) {
    const accessToken = cookiesParser().find(cookie => cookie.key === "access-token")?.value
    const tokenId = cookiesParser().find(cookie => cookie.key === "userId")?.value
    const api = axios.create({
        headers: {
            'access-token': accessToken,
            'token-id': tokenId,
            'content-type': 'application/json',
        },
    })

    if (method === "DELETE") {
        return (await api.delete(`${host}/${path ?? ""}`, { data: body })).data
    } else {
        return (await api[method?.toLowerCase()??"get"](`${host}/${path ?? ""}`, body ?? null)).data
    }
}
