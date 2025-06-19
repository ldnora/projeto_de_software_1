'use client'

import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NavLink from './Nav-link'

// Array de links do site
const Links = [
  { href: '/about-us', label: 'Sobre' },
  { href: '/planta', label: 'Plantas' }
]

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box 
      bg={useColorModeValue('white', 'gray.900')} 
      px={4} 
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
      css={{
        backdropFilter: 'blur(6px)',
        opacity: 0.98,
      }}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <NavLink href="/">
            <Text
              as="span"
              fontWeight="bold"
              fontSize="xl"
              color="teal.700"
              letterSpacing="wide"
            >
              Jardim Botânico UFSM
            </Text>
          </NavLink>
          
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
            </MenuButton>
          </Menu>
        </Flex>
      </Flex>

      {/* Menu Mobile */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}