import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles";
import { Home } from "./Home";

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Home />
        </ThemeProvider>
    );
}
