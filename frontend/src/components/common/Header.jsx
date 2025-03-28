import { useState, useEffect, useRef } from "react"
import { Search, ShoppingBasket, Sun, Moon, Menu, X, MapPin, Store, User, UserPlus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "../../context/ThemeContext"

export default function ECommerceHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchInputRef = useRef(null)
  const searchContainerRef = useRef(null)
  const { darkMode, setDarkMode } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle click outside search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    function handleEscKey(event) {
      if (event.key === "Escape") {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
      searchInputRef.current?.focus()
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isSearchOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const header = document.querySelector("header")
      if (isMenuOpen && header && !header.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop/" },
    { name: "Category", href: "/category" },
    { name: "Vendor", href: "/vendor" },
    { name: "Customer", href: "/customer" },
    { name: "Pages", href: "/pages" },
  ]

  return (
    <header className="w-full border-b bg-[#FFFFFF] text-[#1A1A1A] accent-[#3B82F6] dark:bg-[#111827] dark:border-gray-800 dark:text-[#F9FAFB] dark:accent-[#60A5FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 z-10">
            <Store className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary dark:text-primary" />
            <span className="text-lg sm:text-xl font-bold dark:text-white">ShopHub</span>
          </a>

          {/* Desktop Navigation */}
          {!isSearchOpen && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm lg:text-base font-medium text-muted-foreground hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/track"
                className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center dark:text-gray-300 dark:hover:text-white"
              >
                <MapPin className="mr-1 h-3 w-3 lg:h-4 lg:w-4" />
                Track Order
              </a>
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 dark:text-white" /> : <Menu className="h-5 w-5 dark:text-white" />}
            </button>

            {/* Search */}
            <div
              ref={searchContainerRef}
              className={`absolute left-0 top-0 w-full bg-white dark:bg-gray-900 z-50 px-4 py-2 transition-all duration-300 ${
                isSearchOpen ? "block" : "hidden"
              }`}
            >
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-transparent border-none focus:outline-none px-3 sm:px-4 py-2 sm:py-3 text-sm dark:text-white"
                />
                <button onClick={toggleSearch} className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="h-4 w-4 sm:h-5 sm:w-5 dark:text-white" />
                </button>
              </div>
            </div>
            {!isSearchOpen && (
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800"
                aria-label="Search"
              >
                <Search className="h-5 w-5 dark:text-white" />
              </button>
            )}

            {/* Basket */}
            <a href="/basket" className="relative p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800">
              <ShoppingBasket className="h-5 w-5 dark:text-white" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                0
              </span>
            </a>

            {/* Theme Toggle */}
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    {darkMode ? <Moon className="h-5 w-5 text-white" /> : <Sun className="h-5 w-5" />}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setDarkMode(false)}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDarkMode(true)}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Auth Buttons - Desktop */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild className="dark:border-gray-700 dark:text-white text-xs sm:text-sm">
                <a href="/auth/sing-in" className="flex items-center">
                  <User className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Login
                </a>
              </Button>
              <Button size="sm" asChild className="text-xs sm:text-sm">
                <a href="/auth/sing-up" className="flex items-center">
                  <UserPlus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Sign Up
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden absolute left-0 right-0 top-[72px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50 animate-in fade-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-4">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:text-white"
                  />
                </div>
              </div>
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium py-2 border-b border-gray-100 dark:border-gray-800 text-muted-foreground hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="/track"
                  className="text-sm font-medium py-2 border-b border-gray-100 dark:border-gray-800 text-muted-foreground hover:text-primary transition-colors flex items-center dark:text-gray-300 dark:hover:text-white"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Track Order
                </a>
                <div className="pt-3 flex flex-col space-y-2">
                  <Button variant="outline" size="sm" asChild className="w-full dark:border-gray-700 dark:text-white">
                    <a href="/login" className="flex items-center justify-center">
                      <User className="mr-2 h-4 w-4" />
                      Login
                    </a>
                  </Button>
                  <Button size="sm" asChild className="w-full">
                    <a href="/signup" className="flex items-center justify-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </a>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}