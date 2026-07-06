import { AuthProvider, HttpError } from "react-admin";
import { getURL, parseResponse } from "@/dataProvider/utils";
import { UserResponseV1 } from "@/dataProvider/types";

const keycloakAuthProvider: AuthProvider = {
    login: async () => {
        const response = await fetch(getURL("/v1/users/me"), {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        });
        if (response.status == 200) {
            return { redirectTo: "/" };
        }

        const json = await parseResponse(response);
        if (response.status === 401 && json.error.code === "auth_redirect") {
            // Redirect to Keycloak login page
            window.location.href = json.error.details;
        }
        throw new HttpError(
            response.statusText,
            response.status,
            response.body,
        );
    },
    logout: async () => {
        const result = await fetch(getURL("/v1/auth/logout"), {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        });
        await parseResponse(result);
    },
    checkAuth: async () => {},
    checkError: async (error) => {
        if (error.body.error.code === "auth_redirect") {
            // Redirect to Keycloak login page
            window.location.href = error.body.error.details;
        }
        if (error.status === 401) {
            throw error;
        }
    },
    getIdentity: async (params) => {
        const response = await fetch(getURL("/v1/users/me"), {
            method: "GET",
            redirect: "follow",
            credentials: "include",
            signal: params?.signal,
        });
        const user: UserResponseV1 = await parseResponse(response);
        return {
            id: user.name,
            fullName: user.name,
        };
    },
    handleCallback: async (params) => {
        const query = window.location.search;
        const url = getURL("/v1/auth/callback" + query);
        const response = await fetch(url.toString(), {
            method: "GET",
            redirect: "follow",
            credentials: "include",
            signal: params?.signal,
        });
        await parseResponse(response);
        // Call login method to make a /user/me request and get username
        return await keycloakAuthProvider.login({});
    },
    supportAbortSignal: true,
};

export { keycloakAuthProvider };
