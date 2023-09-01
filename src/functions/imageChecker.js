export default async function imageChecker(imageURL) {
    try { await fetch(imageURL); return imageURL }
    catch { return false }
}