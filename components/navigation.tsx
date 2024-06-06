'use client'

import { usePathname, useRouter } from "next/navigation"
import { NavButton } from "./nav-button"
import { useState } from "react"
import { useMedia } from "react-use"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"




const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export const Navigation = () => {

  const pathname = usePathname();
  const [isOpen, setIsopen] = useState(false)
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleClick = (href: string) => {
    router.push(href)
    setIsopen(false)
  }
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsopen}>
        <SheetTrigger>

          <Button
            className="focus-visible:ring-offset-0 focus-visible:ring-transparent font-normal bg-white/10 hover:bg-white/20
          hover:text-white border-none outline-none text-white focus:bg-white/30 transition"
            variant='outline' size='sm'
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
              className="w-full justify-start"
                key={route.href}
                onClick={() => handleClick(route.href)}
                variant={route.href === pathname ? "secondary" : 'ghost'}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-y-hidden">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  )
}