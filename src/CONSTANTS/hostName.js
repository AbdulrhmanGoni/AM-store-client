let hostName = "http://localhost:7000";

if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
    hostName = process.env.NEXT_PUBLIC_SERVER_HOST
}

export const host = `${hostName}/api`;