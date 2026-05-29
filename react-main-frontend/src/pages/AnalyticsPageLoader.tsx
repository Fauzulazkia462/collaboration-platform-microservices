import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";

const BASE = import.meta.env.VITE_PROJECT_ANGULAR_APP_BASE;
const ENTRY = import.meta.env.VITE_PROJECT_ANGULAR_APP_ENTRY;

export default function AnalyticsPageLoader() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cleanup: any;

        async function load() {
            const module = await import(`${BASE}${ENTRY}`);

            module.mount(ref.current!, {
                getState: useAuthStore.getState,
                dispatch: useAuthStore.setState
            });

            cleanup = module.unmount;
        }

        load();

        return () => cleanup?.();
    }, []);

    return <div ref={ref}></div>;
}