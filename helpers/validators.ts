
// A simple RFC-ish email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A simple URL validation regex that looks for http(s)://
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const isValidEmail = (email: string): boolean => {
    return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
    return urlRegex.test(url);
};

export const normalizeUrl = (url: string): string => {
    if (!url) return '';
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        return `https://${url}`;
    }
    return url;
};
