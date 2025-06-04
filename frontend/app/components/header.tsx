'use client'
import { 
  Box, 
  Container, 
  Flex,
  HStack // Usamos HStack para layout horizontal
} from '@chakra-ui/react'
import Link from 'next/link'
import NavLink from './nav-link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/planta', label: 'Plantas' },
  { href: '/about-us', label: 'Sobre nós' },
]

export default function Header() {
  return (
    <Box as="header" bg="white" opacity={50}>
      <Container maxW="container.xl" py={4}>
        <Flex as="nav" justify="space-between" align="center">
          <Link href="/" style={{ textDecoration: 'none' }}>
            Jardim Botânico UFSM
          </Link>

          <HStack as="nav">
            {links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

