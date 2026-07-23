declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

interface Window {
    env?: {
        API_URL: string;
        AUTH_PROVIDER: "dummyAuthProvider" | "keycloakAuthProvider";
    };
}
