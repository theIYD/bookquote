import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import fonts from "../styles/font-face";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      body: "'Inter', sans-serif",
      heading: "'Inter', sans-serif",
    },
    styles: {
      global: {
        body: {
          fontSize: "sm",
          fontWeight: "400",
          color: "gray.700",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Global styles={fonts} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
