import { useState, useEffect } from "react";
import * as Styles from "./Console.styles";
import { IDomain } from "./types";

// Put this in API service
const domains: IDomain[] = [
    {
        id: 1,
        name: "SyncedTube",
        url: "http://syncedtube.com",
    },
    {
        id: 2,
        name: "@zeilar/hooks",
        url: "https://hooks.angelin.dev",
    },
    {
        id: 3,
        name: "The Programmer Hangout",
        url: "https://tph.angelin.dev",
    },
    {
        id: 4,
        name: "Radio",
        url: "https://radio.angelin.dev",
    },
    {
        id: 5,
        name: "Blog",
        url: "https://blog.angelin.dev",
    },
    {
        id: 6,
        name: "Repcalc",
        url: "https://repcalc.angelin.dev",
    },
];

export function Console() {
    const [activeSelection, setActiveSelection] = useState<IDomain>(domains[0]);
    const [animationOver, setAnimationOver] = useState(false);
    const [hasPicked, setHasPicked] = useState(false);

    useEffect(() => {
        function keyDownHandler(e: KeyboardEvent) {
            if (!animationOver || hasPicked) {
                return;
            }

            if (e.key === "ArrowDown") {
                const nextDomain = domains.find(
                    (domain) => domain.id === activeSelection.id + 1
                );
                if (nextDomain) {
                    setActiveSelection(nextDomain);
                }
            } else if (e.key === "ArrowUp") {
                const previousDomain = domains.find(
                    (domain) => domain.id === activeSelection.id - 1
                );
                if (previousDomain) {
                    setActiveSelection(previousDomain);
                }
            } else if (e.key === "Enter") {
                setHasPicked(true);
            }
        }

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [activeSelection.id, activeSelection.url, animationOver, hasPicked]);

    useEffect(() => {
        if (hasPicked) {
            setTimeout(() => {
                window.location.replace(activeSelection.url);
            }, activeSelection.url.length * 150);
        }
    }, [hasPicked, activeSelection.url]);

    useEffect(() => {
        // Also include loading here maybe
        const timeout = setTimeout(() => {
            setAnimationOver(true);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, []); // Include domains data here that will be async and run this useEffect if data is truthy

    return (
        <Styles.Wrapper>
            <Styles.Toolbar>guest@angelin: ~</Styles.Toolbar>
            <Styles.Container>
                <span>
                    <Styles.User>guest@angelin</Styles.User>:
                    <Styles.Path>~</Styles.Path>${" "}
                    {!hasPicked &&
                        "navigator".split("").map((character, i) => (
                            <Styles.AnimatedCharacter
                                key={i}
                                style={{
                                    animationDelay: `${1000 + 100 * i}ms`,
                                }}
                            >
                                {character}
                            </Styles.AnimatedCharacter>
                        ))}
                </span>
                {animationOver && (
                    <>
                        {!hasPicked && (
                            <>
                                <div>Pick a domain you want to visit.</div>
                                <div>
                                    Use the up and down arrow keys to navigate
                                    the list.
                                </div>
                                <br />
                                <nav>
                                    <Styles.List>
                                        {domains.map((domain, i) => (
                                            <Styles.ListItem
                                                key={i}
                                                className={
                                                    domain.id ===
                                                    activeSelection.id
                                                        ? "active"
                                                        : undefined
                                                }
                                            >
                                                {domain.name}
                                            </Styles.ListItem>
                                        ))}
                                    </Styles.List>
                                </nav>
                            </>
                        )}
                        {hasPicked &&
                            `curl ${activeSelection.url}`
                                .split("")
                                .map((character, i) => (
                                    <Styles.AnimatedCharacter
                                        key={i}
                                        style={{
                                            animationDelay: `${100 * i}ms`,
                                        }}
                                    >
                                        {character}
                                    </Styles.AnimatedCharacter>
                                ))}
                    </>
                )}
            </Styles.Container>
        </Styles.Wrapper>
    );
}
