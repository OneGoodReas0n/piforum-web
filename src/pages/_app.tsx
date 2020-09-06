import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CSSReset />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
