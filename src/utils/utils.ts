// src/utils/utils.ts

export function urlWrap (url: string): string {
    const separator = url.includes("?") ? "&" : "?";
    return url + separator + "t=" + new Date().getTime();
}

export function truncateText (text: string, maxLength: number): string  {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function navigateToUrl(url: string): void {
    window.location.href = url;
}