"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Header() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Visitas</ListHeader>
            <Box as="a" href={""}></Box>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Box
                as="a"
                href={
                  "https://docs.google.com/forms/d/e/1FAIpQLSf0dA0Qrz6fmzOq3FKVxsZ_c5HkCS4ifmmV8SEAeecjmud35w/viewform"
                }
              >
                Agendamento
              </Box>
              <Tag
                size={"sm"}
                bg={useColorModeValue("green.300", "green.800")}
                ml={2}
                color={"white"}
              >
                Novidade
              </Tag>
            </Stack>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Jardim Botânico UFSM</ListHeader>
            <Box as="a" href={"/about-us"}>
              Sobre
            </Box>
            <Box as="a" href={"/about-us#endereço-e-contato"}>
              Contato
            </Box>
            <Box as="a" href={"/regras"}>
              Regras
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Redes sociais</ListHeader>
            <Box
              as="a"
              href={"https://www.facebook.com/JardimBotanicoDeSantaMaria?_rdr"}
            >
              Facebook
            </Box>
            <Box as="a" href={"https://www.instagram.com/jardimbotanicodaufsm"}>
              Instagram
            </Box>
            <Box as="a" href={"https://linktr.ee/jbsm"}>
              Linktee
            </Box>
            <Box
              as="a"
              href={"https://api.whatsapp.com/send?phone=5555991938183"}
            >
              WhatsApp
            </Box>
            <Box
              as="a"
              href={"https://www.youtube.com/channel/UC59lQBXRng2iNjE1BoWlYLw"}
            >
              YouTube
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        ></Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2025 Jardim Botânico Universidade Federal de Santa Maria. Todos os
          direitos reservados
        </Text>
      </Box>
    </Box>
  );
}
