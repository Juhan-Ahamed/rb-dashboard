import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "../../../styles/theme/create-theme";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

function CustomThemeProvider({
  children,
}: ThemeProviderProps): React.JSX.Element {
  const theme = createTheme();

  return (
    <ThemeProvider disableTransitionOnChange theme={theme} defaultMode="light">
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export { CustomThemeProvider as ThemeProvider };
