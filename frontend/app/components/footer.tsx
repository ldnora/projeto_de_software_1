'use client'
import { Box, Container, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" bg="gray.100">
      <Container maxW="container.xl" py={4} centerContent>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Jardim Botânico Universidade Federal de Santa Maria
        </Text>
      </Container>
    </Box>
  )
}