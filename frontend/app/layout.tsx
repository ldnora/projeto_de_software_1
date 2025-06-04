// import type { Metadata } from 'next'
// import { Providers } from './providers'
// import Footer from '@/app/components/footer'
// import Header from '@/app/components/header'
// import { Box, Container } from '@chakra-ui/react'

// export const metadata: Metadata = {
//   title: 'Jardim Botânico UFSM',
//   description: 'Site do Jardim Botânico da Universidade Federal de Santa Maria',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="pt-BR" suppressHydrationWarning>
//       <body>
//         <Providers>
//           <Box
//             bg="gray.100"
//             minH="100vh"
//             display="grid"
//             gridTemplateRows="auto 1fr auto"
//           >
//             <Header />

//             <Container
//               as="main"
//               maxW="container.xl"
//               bg="whiteAlpha.500"
//               borderRadius="xl"
//               py={7}
//               px={8}
//               m={6}
//               overflow="hidden"
//             >
//               {children}
//             </Container>

//             <Footer />

//           </Box>
//         </Providers>
//       </body>
//     </html>
//   )
// }

"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/header";
import Footer from "./components/footer";
import { defaultSystem } from "@chakra-ui/react";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html>
      <head>
        <title>Jardim Botânico UFSM</title>
        <meta name="description" content="Jardim Botânico da Universidade Federal de Santa Maria" />
      </head>
      <body>
        <ChakraProvider value={defaultSystem}>
          <Header />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
