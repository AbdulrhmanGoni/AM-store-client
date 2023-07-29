function timeAgo(theTime) {
    const allDate = new Date().getTime();
    const startDate = new Date(`${theTime}`).getTime();
    let time = allDate - startDate;

    const formatTime = (num, type) => {
        const time = Math.floor(num);
        let s = time === 1 ? "" : "s";
        return `${time} ${type}${s} ago`;
    }

    const seconds = time / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const week = days / 7;
    const months = days / 28;
    const years = months / 12;

    if (seconds <= 60) {
        return "Just now";
    }
    else if (minutes <= 60) {
        return formatTime(minutes, "minute");
    }
    else if (hours <= 24) {
        return formatTime(hours, "hour");
    }
    else if (days <= 14) {
        return formatTime(days, "day");
    }
    else if (week <= 4) {
        return formatTime(week, "week");
    }
    else if (months <= 12) {
        return formatTime(months, "month");
    }
    else {
        return formatTime(years, "year");
    }
}

function numsDecorator(number, title = false, language = "en") {
    number = number.toString().split("").reverse();
    if (!(number.some((n) => { return isNaN(parseInt(n)) })) && number.length > 3) {
        for (let i = 3; i < number.length; i += 3) {
            number[i] += ",";
        }
        number.reverse();
        let lang = { "en": 0, "ar": 1 };
        let theTitle = "";
        if (title === true) {
            switch (true) {
                case number.length < 4:
                    theTitle = "";
                    break;
                case number.length < 7:
                    theTitle = ["k", " ألف"];
                    break;
                case number.length < 10:
                    theTitle = ["m", " مليون"];
                    break;
                case number.length < 13:
                    theTitle = ["b", " مليار"];
                    break;
                case number.length < 16:
                    theTitle = ["t", " تريليون"];
                    break;
                case number.length < 19:
                    theTitle = ["q", " كوادريليون"];
                    break;

                default:
                    theTitle = "";
                    break;
            }
            number = number.join("");
            return number.slice(0, number.indexOf(",")) + theTitle[lang[language]];
        }
        else {
            return number.join("");
        }
    }
    else {
        return number.reverse().join("");
    }

}

function textLimitation(text, limitWords) {
    text = text.split(" ")
    if (typeof (limitWords) != "number") {
        throw Error(`'${limitWords}' must be a number`);
    }
    else if (limitWords && text.length >= limitWords) {
        text = text.filter((word, index) => index < limitWords ? word : false);
    }

    return text.join(" ") + "...";
}

function generateRandomId(length = 20) {
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let upperCase = letters.toUpperCase();
    const chars = letters + '0123456789' + upperCase;
    let id = '';
    while (id.length < length) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars.charAt(randomIndex);
    }
    // Here you could check if the ID is already used, and if not, return it
    // For example, you could check against a database of existing IDs
    // But for simplicity, I'll just return the ID
    return id;
}

function createOverlayLayer(layerId, TargetedParent) {
    const layer = document.createElement("div");
    layer.id = layerId;
    layer.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
        height: 100vh;
        background-color: #00000047;
    `;
    document.getElementById(TargetedParent).appendChild(layer);
    return () => {
        document.getElementById(layerId).remove();
    }
}

function getCurrentDate(days = 0) {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + days);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = nextDate.toLocaleDateString("en-US", options);
    return formattedDate;
}

function formatDate(dateString) {
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


export {
    timeAgo,
    numsDecorator,
    textLimitation,
    generateRandomId,
    createOverlayLayer,
    formatDate,
    getCurrentDate,
};
