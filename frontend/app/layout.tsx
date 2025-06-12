"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/header";
import Footer from "./components/footer";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <head>
        <title>Jardim Botânico UFSM</title>
        <meta
          name="description"
          content="Jardim Botânico da Universidade Federal de Santa Maria"
        />
      </head>
      <body>
        <ChakraProvider>
          <Header />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
