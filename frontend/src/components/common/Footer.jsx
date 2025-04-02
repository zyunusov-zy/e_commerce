import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ECommerceFooter() {
  return (
    <footer className="w-full border-t transition-colors duration-200 dark:border-zinc-800 border-amber-100 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-zinc-800 dark:text-amber-100">
        {/* Brand Info */}
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-wider dark:text-amber-100 text-zinc-800">
            <span className="text-amber-700 dark:text-amber-300">Mebel</span> House
          </h1>
          <p className="text-sm text-zinc-600 dark:text-amber-100 mt-4">
            Discover high-quality luxury furniture with a touch of elegance. Explore our exclusive collection today.
          </p>
          <div className="flex gap-4 mt-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#" className="text-zinc-500 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-500 transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Account Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-2">
            {["Sign Up", "Login", "Orders", "Wishlist", "Support"].map((item, index) => (
              <li key={index}>
                <a href={`/${item.replace(/\s+/g, '').toLowerCase()}`} className="flex items-center text-sm text-zinc-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-500 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1" /> {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-amber-700 dark:text-amber-300 mt-0.5" />
              <span className="text-sm text-zinc-600 dark:text-amber-100">123 Luxury St, Tashkent, Uzbekistan</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-amber-700 dark:text-amber-300" />
              <a href="tel:+998901234567" className="text-sm text-zinc-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-500 transition-colors">
                +998 90 123 45 67
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-amber-700 dark:text-amber-300" />
              <a href="mailto:support@mebelhouse.uz" className="text-sm text-zinc-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-500 transition-colors">
                support@mebelhouse.uz
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-zinc-600 dark:text-amber-100 mb-4">
            Subscribe for exclusive offers and updates on our latest collections.
          </p>
          <div className="flex items-center space-x-2">
            <Input type="email" placeholder="Enter your email" className="flex-1 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-amber-100" />
            <Button className="bg-amber-700 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-white px-4 py-2 rounded-md">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
