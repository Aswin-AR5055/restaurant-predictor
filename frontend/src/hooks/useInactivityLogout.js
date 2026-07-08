import { useEffect, useRef } from "react";

const TIMEOUT_MS = 15 * 60 * 1000;
const EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];

function useInactivityLogout(isAuthenticated, onLogout) {
    const timer = useRef(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const reset = () => {
            clearTimeout(timer.current);
            timer.current = setTimeout(onLogout, TIMEOUT_MS);
        };

        EVENTS.forEach((e) => window.addEventListener(e, reset));
        reset();

        return () => {
            clearTimeout(timer.current);
            EVENTS.forEach((e) => window.removeEventListener(e, reset));
        };
    }, [isAuthenticated, onLogout]);
}

export default useInactivityLogout;
