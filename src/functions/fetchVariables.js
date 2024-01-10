import customFetch from "./customFetch";

export default async function fetchVariables() {
    return await customFetch(`settings/variables`)
}
