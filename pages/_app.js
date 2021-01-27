import Head from "next/head";
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
        html: {
          marginLeft: "calc(100vw - 100%)",
        },
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
      <Head>
        <title>Bookquotes - hub of quotes</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        ></meta>
        <meta
          name="description"
          content="Inspirational, powerful &amp; deep quotes from books across genres."
        ></meta>
        <link rel="icon" type="image/jpg" href="/favicon.ico"></link>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
