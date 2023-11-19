import customFetch from "@/functions/customFetch";

export default async function sendFeedback(feedback) {
    return await customFetch(`mails`, "POST", feedback);
}