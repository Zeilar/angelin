import { useEffect, useState } from "react";
import { Console } from "../Console";

const MAX_DESKTOP_WIDTH = 1000;

export function Home() {
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < MAX_DESKTOP_WIDTH
    );

    useEffect(() => {
        function resizeHandler(e: UIEvent) {
            setIsMobile(window.innerWidth < MAX_DESKTOP_WIDTH);
        }

        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return isMobile ? (
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
            Mobile version is under construction!
        </h1>
    ) : (
        <Console />
    );
}
