import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../context/LanguageContext";

export function useAuth() {
    return useContext(AuthContext);
}

export function useTranslation() {
    return useContext(LanguageContext);
}
