
class SessionData {

    constructor() { }

    static setData(key, data, options) {
        sessionStorage.setItem(key, JSON.stringify(data));
        if (options?.expirationDate) {
            setTimeout(() => {
                this.removeData(key);
            }, options.expirationDate)
        }
    }

    static getData(key) {
        const data = sessionStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    static removeData(key) {
        sessionStorage.removeItem(key);
    }
}

export default SessionData