export default function cookiesParser() {
    return document.cookie.split("; ").map(cookie => {
        return { key: cookie.split("=")[0], value: cookie.split("=")[1] }
    })
}
