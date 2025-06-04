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
      opacity={isActive ? 1 : 0.5}
      _hover={{ opacity: 1 }}
      textDecoration="none"
    >
      {children}
    </Link>
  )
}