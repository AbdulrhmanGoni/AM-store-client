import customFetch from "./customFetch";

export default async function checkUserState() {
    try {
        return !!(await customFetch("check-user-state"));
    } catch {
        return false;
    }
}