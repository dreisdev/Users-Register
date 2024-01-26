export const GetToken = (): string | null => {
    return localStorage.getItem("token");
};

export const SetToken = (token: string | null): string | null => {
    if (token) {
        localStorage.setItem("token", token);
        return token;
    } else {
        console.error("Token is undefined or null");
        return null;
    }
};

export const DelToken = (): void => {
    localStorage.removeItem("token");
};
