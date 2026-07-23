import authProvider from "../dummyAuth";
import { keycloakAuthProvider } from "../keycloakAuth";
import { Login, keycloakLoginForm } from "@/components/login";

/** Types of auth providers for users' authentication */
export const AuthProviderType = {
    /** Default auth provider */
    DUMMY: "dummyAuthProvider",
    /** Keycloak auth provider */
    KEYCLOAK: "keycloakAuthProvider",
};

const AUTH_PROVIDER =
    window.env?.AUTH_PROVIDER ||
    process.env.AUTH_PROVIDER ||
    AuthProviderType.DUMMY;

const getAuthProvider = () => {
    switch (AUTH_PROVIDER) {
        case "keycloakAuthProvider":
            return {
                provider: keycloakAuthProvider,
                loginPage: keycloakLoginForm,
            };
        default:
            return {
                provider: authProvider,
                loginPage: Login,
            };
    }
};

export { getAuthProvider };
