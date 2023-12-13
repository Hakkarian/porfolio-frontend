import { Theme } from "@emotion/react";

// interfaces for light/dark theme

export interface ILightTheme {
    link: string,
    linkHover: string
}
export interface IDarkTheme {
  colors: {
    link: string;
    linkHover: string;
  };
}

export const lightTheme: Partial<Theme> | ((outerTheme: Theme) => Theme) = {
    link: "#269fe5",
    linkHover: 'navy'
};

export const darkTheme:
  | Partial<Theme>
  | ((outerTheme: Theme) => Theme) = {
    link: "#f44336",
    linkHover: "#f46136",
};