import { AuthProvider, PreviousLocationStorageKey } from "react-admin";
import { getHeaders, parseResponse, getURL } from "@/dataProvider/utils";
import { UserResponseV1 } from "@/dataProvider/types";

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        const response = await fetch(getURL("/v1/auth/token"), {
            method: "POST",
            body: formdata,
            redirect: "follow",
        });

        const body = await parseResponse(response);
        localStorage.setItem("token", body.access_token);
    },
    logout: async () => {
        localStorage.removeItem("token");
        localStorage.setItem(PreviousLocationStorageKey, window.location.href);
    },
    checkError: async (error) => {
        if (error.status === 401) {
            throw error;
        }
    },
    checkAuth: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error();
        }
    },
    getPermissions: async () => {},
    getIdentity: async (params) => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("ra.auth.auth_check_error");
        }

        const response = await fetch(getURL("/v1/users/me"), {
            method: "GET",
            redirect: "follow",
            credentials: "include",
            headers: getHeaders(),
            signal: params?.signal,
        });
        const user: UserResponseV1 = await parseResponse(response);
        return {
            id: user.name,
            fullName: user.name,
        };
    },
    supportAbortSignal: true,
};

export default authProvider;
