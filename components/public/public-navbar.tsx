"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import logo from "@/app/[locale]/assets/logo.png";   // ← yeh try karo
import Image from "next/image"
import LanguageSwitcher from '@/components/LanguageSwitcher'; // path adjust kar lo


// ... navbar ke right side mein
<div className="flex items-center gap-4">
  {/* other icons */}
  <LanguageSwitcher />
</div>

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/our-services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/news", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "ar", label: "Arabic", flag: "AR" },
  { code: "de", label: "German", flag: "DE" },
  { code: "fr", label: "French", flag: "FR" },
  { code: "tr", label: "Turkish", flag: "TR" },
  { code: "zh", label: "Chinese", flag: "ZH" },
  { code: "ja", label: "Japanese", flag: "JA" },
]

export function PublicNavbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [currentLang, setCurrentLang] = useState("en")

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Theme handling
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (saved === "light") {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    } else if (saved === "dark" || (!saved && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("theme", next ? "dark" : "light")
      return next
    })
  }

  // Language switch (placeholder – real mein next-intl ya similar use karna)
  const handleLanguageChange = (code: string) => {
    setCurrentLang(code)
    localStorage.setItem("language", code)
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = code
    // Real i18n: router.push(`/${code}${pathname}`)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/85 backdrop-blur-lg border-b shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
              >
                <img
                  src={logo.src} // StaticImageData fix
                  alt="AM Enterprises Logo"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h1 className="font-bold text-xl text-foreground">AM Enterprises</h1>
                  <p className="text-xs text-muted-foreground">360° Digital Agency</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive(link.href)
                      ? "text-primary after:absolute after:inset-x-4 after:bottom-1.5 after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 hidden sm:flex">
                    <Globe className="size-4" />
                    <span className="text-xs font-semibold">{currentLang.toUpperCase()}</span>
                    <ChevronDown className="size-3 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onSelect={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "cursor-pointer text-sm",
                        currentLang === lang.code && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      <span className="mr-2 font-semibold">{lang.flag}</span>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="size-9"
                aria-label="Toggle dark/light mode"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0.8, opacity: 0, rotate: -30 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Sun className="size-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0.8, opacity: 0, rotate: 30 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotate: -30 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Moon className="size-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* CTA Button */}
              <Button
                asChild
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-md shadow-primary/20"
              >
                <Link href="/contact">Get Started</Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%] sm:w-[400px] pr-0">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 py-6 px-2 space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
                            isActive(link.href)
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t p-4">
                      <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                        <Link href="/auth/login">Get Started</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  )
}