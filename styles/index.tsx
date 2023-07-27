'use client';
import { GlobalStyles } from './global';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';

const Providers = ({ children }: any) => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
};
export default Providers;
