let hostName = "http://localhost:7000";

if (process.env.REACT_APP_NODE_ENV === "production") {
    hostName = process.env.REACT_APP_SERVER_HOST
}

export const host = `${hostName}/api`;