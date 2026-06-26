import { createContext, useState, useEffect } from "react";
import translations from "../i18n/translations";

export const LanguageContext = createContext();

const STORAGE_KEY = "appLanguage";

function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(
        localStorage.getItem(STORAGE_KEY) || "en"
    );

    const [messages, setMessages] = useState(
        translations[language] || translations.en
    );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language);
        setMessages(translations[language] || translations.en);
    }, [language]);

    const t = (key) => messages[key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageProvider;
