import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Moon, Sun, Search, User, Heart, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation("header");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    code: "en",
    name: "EN",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languageRef = useRef(null);
  const languages = [
    { code: "en", name: "EN" },
    { code: "ru", name: "RU" },
    { code: "uz", name: "UZ" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Handle theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Close dropdown when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <header className="w-full border-b transition-colors duration-200 dark:border-zinc-800 border-amber-100 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left side controls */}
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 dark:text-amber-100 text-zinc-800 dark:bg-zinc-800 bg-amber-50 dark:hover:bg-zinc-700 hover:bg-amber-100"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <Globe className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              <span className="text-amber-700 dark:text-amber-300 font-serif">
                {currentLanguage.name}
              </span>
              <ChevronDown className="h-3 w-3 text-amber-700 dark:text-amber-300" />
            </button>

            {/* Dropdown Menu */}
            {isLanguageOpen && (
              <div className="absolute left-0 mt-2 w-28 dark:bg-zinc-800 bg-white shadow-lg rounded-lg border dark:border-zinc-700 border-amber-100 z-50 overflow-hidden transition-all">
                <ul className="py-1">
                  {languages.map((language) => (
                    <li key={language.code}>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm transition ${
                          currentLanguage.code === language.code
                            ? "bg-amber-700 dark:bg-amber-600 text-white font-serif"
                            : "dark:text-amber-100 text-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-700"
                        }`}
                        onClick={() => {
                          setCurrentLanguage(language);
                          changeLanguage(language.code);
                          setIsLanguageOpen(false);
                        }}
                      >
                        {language.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full transition-colors duration-200 dark:bg-zinc-800 bg-amber-50 dark:hover:bg-zinc-700 hover:bg-amber-100"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-300" />
            ) : (
              <Moon className="h-4 w-4 text-amber-700" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="/" className="block">
            <h1 className="text-2xl font-serif font-bold dark:text-amber-100 text-zinc-800 tracking-wider">
              <span className="text-amber-700 dark:text-amber-300">Mebel</span>{" "}
              House
            </h1>
          </a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="transition-colors duration-200 hover:text-amber-700 dark:text-amber-100 text-zinc-700 dark:hover:text-amber-300">
            <User className="w-5 h-5" />
          </button>
          <button className="transition-colors duration-200 hover:text-amber-700 dark:text-amber-100 text-zinc-700 dark:hover:text-amber-300">
            <Heart className="w-5 h-5" />
          </button>
          <button className="transition-colors duration-200 hover:text-amber-700 dark:text-amber-100 text-zinc-700 dark:hover:text-amber-300 relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-amber-700 dark:bg-amber-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="border-t transition-colors duration-200 dark:border-zinc-800 border-amber-100 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-6 flex items-center justify-between py-3">
          <ul className="flex space-x-6 text-sm font-medium dark:text-amber-100 text-zinc-800">
            {["New", "Furniture", "Decor", "Sale", "Blog", "About Us"].map(
              (item) => (
                <li
                  key={item}
                  className="uppercase hover:underline hover:font-medium cursor-pointer"
                >
                  {item}
                </li>
              )
            )}
          </ul>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search"
              className="w-full border dark:border-zinc-700 border-gray-300 rounded-full px-4 py-2 text-sm bg-white dark:bg-zinc-800 dark:text-amber-100 text-zinc-800"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-4 h-4 text-zinc-800 dark:text-amber-100" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
