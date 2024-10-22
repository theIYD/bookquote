import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import fonts from "../styles/font-face";

import Nav from "../components/Nav";

const navBlacklist = ["/"];

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

const WrappedApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const theme = extendTheme({
    fonts: {
      body: "'Inter', sans-serif",
      heading: "'Inter', sans-serif",
    },
    styles: {
      global: {
        html: {
          marginLeft: "calc(100vw - 100%)",
          height: "100%",
        },
        body: {
          fontSize: "sm",
          fontWeight: "400",
          color: "gray.700",
          height: "100%",
        },
      },
    },
  });

  const queryClient = new QueryClient();
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KWK1RNZ029"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KWK1RNZ029');`,
          }}
        />
      </Head>
      {!navBlacklist.includes(router.pathname) && <Nav />}
      <QueryClientProvider client={queryClient}>
        <MyApp Component={Component} pageProps={pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default WrappedApp;
