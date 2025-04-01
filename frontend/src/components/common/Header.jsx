import { useState, useRef, useEffect } from "react";
import {
  Globe,
  ChevronDown,
  Moon,
  Sun,
  Search,
  User,
  Heart,
  ShoppingCart,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation("header");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    code: "en",
    name: "EN",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Modern sofa",
    "Dining table",
    "Bedroom furniture",
    "Coffee table"
  ]);

  // Mock search results - in a real app, this would come from an API
  const [searchResults, setSearchResults] = useState([
    {
      title: "Elegant Sofa",
      category: "Living Room",
      price: "$1,299",
      image: "/api/placeholder/80/60"
    },
    {
      title: "Modern Coffee Table",
      category: "Living Room",
      price: "$499",
      image: "/api/placeholder/80/60"
    },
    {
      title: "Dining Chair Set",
      category: "Dining Room",
      price: "$799",
      image: "/api/placeholder/80/60"
    }
  ]);

  const languageRef = useRef(null);
  const searchRef = useRef(null);

  const languages = [
    { code: "en", name: "EN" },
    { code: "ru", name: "RU" },
    { code: "uz", name: "UZ" },
  ];

  // Navigation data structure
  const navCategories = [
    {
      name: "New",
      submenu: [
        {
          title: "BY CATEGORY",
          links: [
            "New Furniture",
            "New Pottery",
            "New Décor",
            "New Lighting",
            "New Dining",
            "All New",
          ],
        },
        {
          title: "TRENDING",
          links: ["Bestsellers", "The Vibe is... Beachy Pop"],
        },
      ],
      featured: {
        image: "/api/placeholder/600/400",
        alt: "New arrivals featured image",
      },
    },
    {
      name: "Furniture",
      submenu: [
        {
          title: "LIVING ROOM",
          links: [
            "Sofas",
            "Sectionals",
            "Daybeds & Chaises",
            "Chairs",
            "Benches & Ottomans",
            "Consoles & Credenzas",
            "Étagère & Cabinets",
            "Chests",
            "Cocktail Tables",
            "View All",
          ],
        },
        {
          title: "BEDROOM",
          links: [
            "Beds",
            "Headboards",
            "Dressers & Chests",
            "Side & Accent Tables",
            "Benches & Ottomans",
            "View All",
          ],
        },
        {
          title: "DINING ROOM",
          links: [
            "Dining Tables",
            "Dining Chairs",
            "Bars & Bar Carts",
            "Buffets & Sideboards",
            "View All",
          ],
        },
        {
          title: "OFFICE",
          links: ["Desks"],
        },
      ],
      featured: {
        image: "/api/placeholder/600/400",
        alt: "Furniture featured image",
      },
    },
    {
      name: "Decor",
      submenu: [
        {
          title: "BY COLLECTION",
          links: [
            "Bond",
            "Ether",
            "Globo",
            "Jacques",
            "Lampert",
            "Pompidou",
            "Rider",
            "Riviera",
            "Talitha",
          ],
        },
      ],
      featured: {
        image: "/api/placeholder/600/400",
        alt: "Decor featured image",
      },
    },
    {
      name: "Sale",
      submenu: [
        {
          title: "READY-TO-SHIP FURNITURE",
          links: [],
        },
        {
          title: "CUSTOM UPHOLSTERY",
          links: [],
        },
        {
          title: "CONTRACT-FRIENDLY FURNITURE",
          links: [],
        },
        {
          title: "SALE FURNITURE",
          links: [],
        },
        {
          title: "ALL FURNITURE",
          links: [],
        },
      ],
      featured: {
        image: "/api/placeholder/600/400",
        alt: "Sale featured image",
      },
    },
    { name: "Blog", submenu: [] },
    { name: "About Us", submenu: [] },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    // In a real app, you would trigger an API search here
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchValue.trim())) {
        setRecentSearches(prev => [searchValue.trim(), ...prev.slice(0, 3)]);
      }
      // Redirect to search results page or perform search
      console.log(`Searching for: ${searchValue}`);
      setIsSearchFocused(false);
    }
  };

  const removeRecentSearch = (search) => {
    setRecentSearches(prev => prev.filter(item => item !== search));
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

  // Close dropdowns when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      if (!event.target.closest(".nav-item") && !event.target.closest(".dropdown-menu")) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
        setActiveDropdown(null);
        setIsSearchFocused(false);
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
      <nav className="border-t transition-colors duration-200 dark:border-zinc-800 border-amber-100 bg-white dark:bg-zinc-900 relative">
        <div className="container mx-auto px-6 flex items-center justify-between py-3">
          <ul className="flex space-x-6 text-sm font-medium dark:text-amber-100 text-zinc-800">
            {navCategories.map((category) => (
              <li
                key={category.name}
                className="nav-item uppercase hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer"
                onMouseEnter={() => {
                  setActiveDropdown(category.name);
                  setIsSearchFocused(false);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
          
          {/* Search with dropdown */}
          <div className="relative w-64" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearch}
                onFocus={() => {
                  setIsSearchFocused(true);
                  setActiveDropdown(null);
                }}
                className="w-full border dark:border-zinc-700 border-gray-300 rounded-full px-4 py-2 text-sm bg-white dark:bg-zinc-800 dark:text-amber-100 text-zinc-800"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-4 h-4 text-zinc-800 dark:text-amber-100" />
              </button>
            </form>
            
            {/* Search dropdown */}
            {isSearchFocused && (
              <div className="dropdown-menu absolute right-0 mt-2 w-96 bg-white dark:bg-zinc-900 border dark:border-zinc-700 border-amber-100 shadow-lg rounded-lg z-50">
                <div className="p-4">
                  <div className="flex">
                    {/* Recent searches column */}
                    <div className="w-1/2 pr-4 border-r dark:border-zinc-700 border-amber-100">
                      <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                        RECENT SEARCHES
                      </h3>
                      {recentSearches.length > 0 ? (
                        <ul>
                          {recentSearches.map((search, index) => (
                            <li key={index} className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 text-zinc-500 dark:text-zinc-400 mr-2" />
                                <span className="text-sm text-zinc-800 dark:text-amber-100">
                                  {search}
                                </span>
                              </div>
                              <button 
                                onClick={() => removeRecentSearch(search)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-amber-300"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          No recent searches
                        </p>
                      )}
                    </div>
                    
                    {/* Results preview column */}
                    <div className="w-1/2 pl-4">
                      <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                        POPULAR PRODUCTS
                      </h3>
                      <ul>
                        {searchResults.map((result, index) => (
                          <li key={index} className="flex items-start mb-3">
                            <img 
                              src={result.image} 
                              alt={result.title} 
                              className="w-12 h-12 object-cover mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-zinc-800 dark:text-amber-100">
                                {result.title}
                              </p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {result.category}
                              </p>
                              <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                                {result.price}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 text-right">
                        <button className="text-xs flex items-center justify-end text-amber-700 dark:text-amber-300 font-medium">
                          View all results
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Dropdown Menus */}
        {activeDropdown && (
          <div 
            className="dropdown-menu absolute left-0 right-0 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 border-amber-100 z-40"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="container mx-auto py-8 px-6">
              <div className="flex">
                {navCategories.find(cat => cat.name === activeDropdown)?.submenu.map((section, index) => (
                  <div key={index} className="pr-12 last:pr-0">
                    <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a 
                            href="#" 
                            className="text-sm text-zinc-800 dark:text-amber-100 hover:text-amber-700 dark:hover:text-amber-300"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {navCategories.find(cat => cat.name === activeDropdown)?.featured && (
                  <div className="ml-auto">
                    <img 
                      src={navCategories.find(cat => cat.name === activeDropdown).featured.image} 
                      alt={navCategories.find(cat => cat.name === activeDropdown).featured.alt}
                      className="w-64 h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}