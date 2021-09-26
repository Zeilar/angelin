import "@fontsource/jetbrains-mono";
import background from "../assets/images/background.png";
import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    :root {
        font-family: "Jetbrains Mono";
    }

    ::selection {
        ${(props) => css`
            color: ${props.theme.colors.body};
            background-color: ${props.theme.colors.text};
        `}
    }

    body {
        background: center / cover url(${background});
        min-height: 100vh;
        ${(props) => css`
            color: ${props.theme.colors.text};
            background-color: ${props.theme.colors.body};
        `}
    }
`;
