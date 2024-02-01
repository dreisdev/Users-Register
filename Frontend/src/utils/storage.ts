export const GetToken = (): string | null => {
    return localStorage.getItem("token");
};

export const GetUserId = (): string | null => {
    return localStorage.getItem("userId");
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

export const SetId = (userId: string | null): string | null => {
    if (userId) {
        localStorage.setItem("userId", userId);
        return userId;
    } else {
        console.error("userId is undefined or null");
        return null;
    }
};

export const LogoutUser = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
};
