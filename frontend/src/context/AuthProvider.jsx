import { useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import useInactivityLogout from "../hooks/useInactivityLogout";

function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access")
    );

    const logout = useCallback(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setAccessToken(null);
        window.location.href = "/";
    }, []);

    useInactivityLogout(!!accessToken, logout);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;