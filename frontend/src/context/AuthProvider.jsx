import { useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access")
    );

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