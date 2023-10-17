export default function generateRandomId(length = 20) {
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let upperCase = letters.toUpperCase();
    const chars = letters + '0123456789' + upperCase;
    let id = '';
    while (id.length < length) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars.charAt(randomIndex);
    }
    return id;
}