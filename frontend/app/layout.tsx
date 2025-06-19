import ChakraProviders from "./ChakraProviders";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Jardim Botânico UFSM</title>
        <meta name="description" content="Jardim Botânico da Universidade Federal de Santa Maria" />
      </head>
      <body>
        <ChakraProviders>
          <Header />
          {children}
          <Footer />
        </ChakraProviders>
      </body>
    </html>
  );
}