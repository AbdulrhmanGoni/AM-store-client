import headersRequest from "../CONSTANT/headersRequest";
import { host } from "../CONSTANT/hostName";

export default async function customFetch(path, method, body) {
    return (await fetch(`${host}/${path ?? ""}`, headersRequest(method, body))).json()
}
