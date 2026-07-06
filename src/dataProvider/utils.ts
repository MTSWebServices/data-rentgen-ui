import { HttpError } from "react-admin";

const parseResponse = async (response: Response) => {
    if (response.status == 204) {
        return {};
    }

    const body = await response.text();
    let json;
    try {
        json = JSON.parse(body);
    } catch {
        json = {};
    }

    if (response.status < 200 || response.status >= 400) {
        throw new HttpError(json.error?.message ?? body, response.status, json);
    }
    return json;
};

const API_URL = "http://localhost:8000";

const getURL = (path: string): URL => {
    // if API_URL is relative, resolve it to absolute URL using current window location
    const baseUrl = window.location.toString();
    return new URL(API_URL + path, baseUrl);
};

const getHeaders = (): Headers => {
    const headers = new Headers();
    const token = localStorage.getItem("token");
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export { parseResponse, getURL, getHeaders };
