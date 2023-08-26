export default function formatDate(dateString) {
    // Create a new Date object from the given string
    const dateObj = new Date(dateString);

    // Format the date using the toLocaleDateString() method
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return formattedDate;
}