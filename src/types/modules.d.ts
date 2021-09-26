import { ITheme } from "../styles/types";

declare module "styled-components" {
    export interface DefaultTheme extends ITheme {}
}
