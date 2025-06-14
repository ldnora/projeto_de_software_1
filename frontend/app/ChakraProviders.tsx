"use client";

import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import theme from "./theme";

export default function ChakraProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      {children}
    </ChakraProvider>
  );
}
