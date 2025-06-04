"use client";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box p={9}>
      <Heading>Testando Chakra UI</Heading>
      <Text mt={4}>Se você está vendo isso sem erro de hydration, está tudo certo!</Text>
      <Button colorScheme="teal" mt={6}>Clique aqui</Button>
    </Box>
  );
}