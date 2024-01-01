import axios from "axios";
import { host } from "@/CONSTANT/hostName";
import { cookiesParser } from "@abdulrhmangoni/am-store-library";

export default async function customFetch(path, method, body) {
    const { ["access-token"]: accessToken, userId } = cookiesParser()

    const api = axios.create({
        headers: {
            'access-token': accessToken,
            'token-id': userId,
            'content-type': 'application/json'
        },
    })

    if (method === "DELETE") {
        return (await api.delete(`${host}/${path ?? ""}`, { data: body })).data
    } else {
        return (await api[method?.toLowerCase() ?? "get"](`${host}/${path ?? ""}`, body ?? null)).data
    }
}
