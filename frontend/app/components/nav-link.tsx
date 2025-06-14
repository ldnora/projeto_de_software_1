'use client'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: Readonly<NavLinkProps>) {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link
      as={NextLink}
      href={href}
      px={3}
      py={2}
      rounded="md"
      fontWeight={isActive ? "bold" : "normal"}
      color={isActive ? "blue.600" : "blue.700"}
      bg={isActive ? "blue.100" : "transparent"}
      _hover={{
        textDecoration: "none",
        bg: "blue.50",
        color: "blue.700",
      }}
      transition="all 0.2s"
    >
      {children}
    </Link>
  )
}