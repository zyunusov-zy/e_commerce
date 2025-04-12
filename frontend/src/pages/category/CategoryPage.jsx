import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import MainLayout from "../../components/common/MainLayout"
import SmallProductCard from "@/components/common/SmallProductCard"
import { products } from "./category"
import { ChevronLeft, ChevronRight, SlidersHorizontal, X, Heart } from "lucide-react"

function ChevronDown(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const sortDropdownRef = useRef(null);

  const categoryProducts = products.filter((product) => product.category === slug)
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 12
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage)

  const currentProducts = categoryProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  )

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  // Sort dropdown state
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  
  // Filter drawer state
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MainLayout>
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          src="/placeholder.svg?height=300&width=1200"
          alt={`${slug} category`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-serif font-bold text-white uppercase tracking-wider">{slug}</h1>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="container mx-auto px-6 py-6 flex items-center justify-between border-b border-amber-100 dark:border-zinc-800">
        <button 
          className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 dark:text-amber-100 text-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-800"
          onClick={() => setShowFilterDrawer(true)}
        >
          <SlidersHorizontal className="h-4 w-4 text-amber-700 dark:text-amber-300" />
          <span className="text-amber-700 dark:text-amber-300 font-serif uppercase">Filter</span>
        </button>

        <div className="text-sm text-zinc-500 dark:text-zinc-400">{categoryProducts.length} items</div>

        <div className="relative" ref={sortDropdownRef}>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 dark:text-amber-100 text-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-800"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span className="text-amber-700 dark:text-amber-300 font-serif uppercase">Sort</span>
            <ChevronDown className="h-3 w-3 text-amber-700 dark:text-amber-300" />
          </button>
          
          {/* Sort Dropdown */}
          {showSortDropdown && (
            <div className="absolute  right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md shadow-lg z-100 overflow-hidden">
              <ul className="py-1">
                <li className="px-4 py-3 text-sm hover:bg-amber-50 dark:hover:bg-zinc-800 cursor-pointer font-medium text-amber-700 dark:text-amber-300 border-l-2 border-amber-700">
                  Bestsellers
                </li>
                <li className="px-4 py-3 text-sm hover:bg-amber-50 dark:hover:bg-zinc-800 cursor-pointer border-l-2 border-transparent hover:border-amber-700 transition-all">
                  Newest
                </li>
                <li className="px-4 py-3 text-sm hover:bg-amber-50 dark:hover:bg-zinc-800 cursor-pointer border-l-2 border-transparent hover:border-amber-700 transition-all">
                  Name: A - Z
                </li>
                <li className="px-4 py-3 text-sm hover:bg-amber-50 dark:hover:bg-zinc-800 cursor-pointer border-l-2 border-transparent hover:border-amber-700 transition-all">
                  Name: Z - A
                </li>
                <li className="px-4 py-3 text-sm hover:bg-amber-50 dark:hover:bg-zinc-800 cursor-pointer border-l-2 border-transparent hover:border-amber-700 transition-all">
                  Price: Low to High
                </li>
                <li className="px-4 py-3 text-sm hover:bg-amber-50 dark:hover:bg-zinc-800 cursor-pointer border-l-2 border-transparent hover:border-amber-700 transition-all">
                  Price: High to Low
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="relative group">
              <SmallProductCard product={product} />
              <button className="absolute top-4 right-4 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 dark:hover:bg-zinc-700">
                <Heart className="h-5 w-5 text-amber-700 dark:text-amber-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-12 space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full border ${
                currentPage === 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-amber-700 text-amber-700 hover:bg-amber-50"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === index
                    ? "bg-amber-700 text-white"
                    : "text-zinc-800 hover:bg-amber-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full border ${
                currentPage === totalPages - 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-amber-700 text-amber-700 hover:bg-amber-50"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Filter Drawer/Modal - Using backdrop blur effect instead of solid black */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={() => setShowFilterDrawer(false)}
          ></div>
          <div className="absolute inset-y-0 right-0 max-w-lg w-full bg-white dark:bg-zinc-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 dark:border-zinc-800">
              <h2 className="text-xl font-serif font-medium text-amber-800 dark:text-amber-200">FILTER & SORT</h2>
              <button 
                onClick={() => setShowFilterDrawer(false)} 
                className="p-2 rounded-full hover:bg-amber-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="h-5 w-5 text-amber-700 dark:text-amber-300" />
              </button>
            </div>
            
            <div className="p-6 h-full overflow-y-auto pb-32">
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4 text-amber-800 dark:text-amber-200 uppercase tracking-wider">Sort By</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="radio" name="sort" className="accent-amber-700 h-4 w-4" />
                    <span className="text-sm">Bestsellers</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="radio" name="sort" className="accent-amber-700 h-4 w-4" />
                    <span className="text-sm">Newest</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="radio" name="sort" className="accent-amber-700 h-4 w-4" />
                    <span className="text-sm">Name: A - Z</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="radio" name="sort" className="accent-amber-700 h-4 w-4" />
                    <span className="text-sm">Name: Z - A</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="radio" name="sort" className="accent-amber-700 h-4 w-4" />
                    <span className="text-sm">Price: Low to High</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="radio" name="sort" className="accent-amber-700 h-4 w-4" />
                    <span className="text-sm">Price: High to Low</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-8 border-t border-amber-100 dark:border-zinc-800 pt-6">
                <h3 className="text-sm font-medium mb-4 text-amber-800 dark:text-amber-200 uppercase tracking-wider">Product Type</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="checkbox" className="accent-amber-700 h-4 w-4 rounded" />
                    <span className="text-sm">Chairs</span>
                    <span className="text-xs text-zinc-500 ml-auto">24</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="checkbox" className="accent-amber-700 h-4 w-4 rounded" />
                    <span className="text-sm">Sofas</span>
                    <span className="text-xs text-zinc-500 ml-auto">18</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="checkbox" className="accent-amber-700 h-4 w-4 rounded" />
                    <span className="text-sm">Tables</span>
                    <span className="text-xs text-zinc-500 ml-auto">32</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-8 border-t border-amber-100 dark:border-zinc-800 pt-6">
                <h3 className="text-sm font-medium mb-4 text-amber-800 dark:text-amber-200 uppercase tracking-wider">Price</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="checkbox" className="accent-amber-700 h-4 w-4 rounded" />
                    <span className="text-sm">$0 - $1,000</span>
                    <span className="text-xs text-zinc-500 ml-auto">45</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="checkbox" className="accent-amber-700 h-4 w-4 rounded" />
                    <span className="text-sm">$1,000 - $2,000</span>
                    <span className="text-xs text-zinc-500 ml-auto">23</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="checkbox" className="accent-amber-700 h-4 w-4 rounded" />
                    <span className="text-sm">$2,000 - $5,000</span>
                    <span className="text-xs text-zinc-500 ml-auto">12</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1 hover:text-amber-700 transition-colors">
                    <input type="checkbox" className="accent-amber-700 h-4 w-4 rounded" />
                    <span className="text-sm">$5,000+</span>
                    <span className="text-xs text-zinc-500 ml-auto">5</span>
                  </label>
                </div>
              </div>

              <div className="mb-14 border-t border-amber-100 dark:border-zinc-800 pt-6">
                <h3 className="text-sm font-medium mb-4 text-amber-800 dark:text-amber-200 uppercase tracking-wider">Color</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="w-8 h-8 rounded-full bg-black border-2 border-transparent hover:border-amber-700 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-amber-700 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-amber-700 border-2 border-transparent hover:border-amber-900 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-500 border-2 border-transparent hover:border-amber-700 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-green-600 border-2 border-transparent hover:border-amber-700 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-red-600 border-2 border-transparent hover:border-amber-700 transition-all"></button>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-amber-100 dark:border-zinc-800 flex gap-4 bg-white dark:bg-zinc-900 shadow-md">
              <button className="flex-1 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded transition-colors">
                APPLY
              </button>
              <button className="flex-1 py-3 border border-amber-700 text-amber-700 font-medium rounded hover:bg-amber-50 dark:hover:bg-zinc-800 transition-colors">
                CLEAR ALL
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}