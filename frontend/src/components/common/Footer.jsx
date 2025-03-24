import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Clock,
    Store,
    ChevronRight,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  
  export default function ECommerceFooter() {
    return (
      <footer className="bg-[#F3F4F6] text-[#4B5563] dark:bg-[#111827] dark:text-[#D1D5DB] border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Store className="h-6 w-6 text-primary dark:text-primary" />
                <span className="text-xl font-bold">ShopHub</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                ShopHub is your one-stop destination for all your shopping needs. We offer a wide range of products with
                fast delivery and excellent customer service.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/category"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="/vendor"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Vendors
                  </a>
                </li>
                <li>
                  <a
                    href="/track"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Track Order
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary dark:text-primary mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    123 Commerce Street, Shopping District, NY 10001, USA
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary dark:text-primary" />
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary dark:text-primary" />
                  <a
                    href="mailto:info@shophub.com"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  >
                    info@shophub.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary dark:text-primary" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Mon - Fri: 8AM - 9PM</span>
                </li>
              </ul>
            </div>
  
            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="/team"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  