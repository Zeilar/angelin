import { useState, useEffect } from "react";
import { AnimatedCharacter } from "../Home";
import * as Styles from "./Console.styles";
import { IDomain } from "./types";

const defaultDomains: IDomain[] = [
    {
        id: 1,
        name: "TPH",
        url: "https://tph.angelin.dev",
    },
    {
        id: 2,
        name: "Blog",
        url: "https://blog.angelin.dev",
    },
    {
        id: 3,
        name: "Repcalc",
        url: "https://repcalc.angelin.dev",
    },
];

export function Console() {
    const [activeSelection, setActiveSelection] = useState<IDomain>(
        defaultDomains[0]
    );
    const [animationOver, setAnimationOver] = useState(false);
    const [hasPicked, setHasPicked] = useState(false);

    useEffect(() => {
        function keyDownHandler(e: KeyboardEvent) {
            if (!animationOver) {
                return;
            }

            if (e.key === "ArrowDown") {
                const nextDomain = defaultDomains.find(
                    (domain) => domain.id === activeSelection.id + 1
                );
                if (nextDomain) {
                    setActiveSelection(nextDomain);
                }
            } else if (e.key === "ArrowUp") {
                const previousDomain = defaultDomains.find(
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
    }, [activeSelection.id, activeSelection.url, animationOver]);

    useEffect(() => {
        if (hasPicked) {
            setTimeout(() => {
                window.location.href = activeSelection.url;
            }, 4000);
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
    }, []); // Include defaultDomains data here that will be async and run this useEffect if data is truthy

    return (
        <Styles.Wrapper>
            <Styles.Toolbar>guest@angelin: ~</Styles.Toolbar>
            <Styles.Container>
                <span>
                    <Styles.User>guest@angelin</Styles.User>:
                    <Styles.Path>~</Styles.Path>${" "}
                    {"navigator".split("").map((character, i) => (
                        <AnimatedCharacter
                            key={i}
                            style={{ animationDelay: `${1000 + 100 * i}ms` }}
                        >
                            {character}
                        </AnimatedCharacter>
                    ))}
                </span>
                {animationOver && (
                    <>
                        <div>Pick a domain you want to visit.</div>
                        <div>
                            Use the up and down arrow keys to navigate the list.
                        </div>
                        <br />
                        <nav>
                            <Styles.List>
                                {defaultDomains.map((domain, i) => (
                                    <Styles.ListItem
                                        key={i}
                                        className={
                                            domain.id === activeSelection.id
                                                ? "active"
                                                : undefined
                                        }
                                    >
                                        {domain.name}
                                    </Styles.ListItem>
                                ))}
                            </Styles.List>
                        </nav>
                        {hasPicked && (
                            <>
                                <br />
                                {`curl ${activeSelection.url}`
                                    .split("")
                                    .map((character, i) => (
                                        <AnimatedCharacter
                                            key={i}
                                            style={{
                                                animationDelay: `${100 * i}ms`,
                                            }}
                                        >
                                            {character}
                                        </AnimatedCharacter>
                                    ))}
                            </>
                        )}
                    </>
                )}
            </Styles.Container>
        </Styles.Wrapper>
    );
}
