import MainLayout from "../../components/common/MainLayout"
import { ArrowRight, Star } from "lucide-react"
import main2 from "../../assets/main2.jpeg"

export default function HomePage() {
  // Sample data for the homepage
  const featuredCollections = [
    {
      id: 1,
      title: "Modern Minimalist",
      image: "/placeholder.svg?height=500&width=400",
      description: "Clean lines and functional elegance",
    },
    {
      id: 2,
      title: "Scandinavian Inspired",
      image: "/placeholder.svg?height=500&width=400",
      description: "Warm woods and cozy comfort",
    },
    {
      id: 3,
      title: "Luxury Living",
      image: "/placeholder.svg?height=500&width=400",
      description: "Opulent details and rich textures",
    },
  ]

  const newArrivals = [
    {
      id: 1,
      name: "Cloud Sofa",
      price: "$2,499",
      image: "/placeholder.svg?height=500&width=400",
      hoverImage: "/placeholder.svg?height=500&width=400&text=Hover",
      category: "Seating",
    },
    {
      id: 2,
      name: "Brass Accent Table",
      price: "$899",
      image: "/placeholder.svg?height=500&width=400",
      hoverImage: "/placeholder.svg?height=500&width=400&text=Hover",
      category: "Tables",
    },
    {
      id: 3,
      name: "Sculptural Vase",
      price: "$349",
      image: "/placeholder.svg?height=500&width=400",
      hoverImage: "/placeholder.svg?height=500&width=400&text=Hover",
      category: "Decor",
    },
    {
      id: 4,
      name: "Geometric Chandelier",
      price: "$1,299",
      image: "/placeholder.svg?height=500&width=400",
      hoverImage: "/placeholder.svg?height=500&width=400&text=Hover",
      category: "Lighting",
    },
  ]

  const bestSellers = [
    {
      id: 1,
      name: "Amber Lounge Chair",
      price: "$1,299",
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300&text=Hover",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Geometric Coffee Table",
      price: "$899",
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300&text=Hover",
      rating: 4.9,
      reviews: 86,
    },
    {
      id: 3,
      name: "Sculptural Floor Lamp",
      price: "$459",
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300&text=Hover",
      rating: 4.7,
      reviews: 53,
    },
    {
      id: 4,
      name: "Velvet Dining Chair",
      price: "$349",
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300&text=Hover",
      rating: 4.6,
      reviews: 78,
    },
  ]

  const testimonials = [
    {
      id: 1,
      text: "The quality of my new sofa exceeded all expectations. Mebel House has become my go-to for all home furnishings.",
      author: "Sarah J.",
      location: "New York, NY",
    },
    {
      id: 2,
      text: "Exceptional craftsmanship and attention to detail. My dining set is both beautiful and functional.",
      author: "Michael T.",
      location: "Chicago, IL",
    },
    {
      id: 3,
      text: "The customer service was as impressive as the furniture itself. A truly wonderful shopping experience.",
      author: "Emma L.",
      location: "Los Angeles, CA",
    },
  ]

  const instagramPosts = [
    { id: 1, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, image: "/placeholder.svg?height=200&width=200" },
    { id: 4, image: "/placeholder.svg?height=200&width=200" },
    { id: 5, image: "/placeholder.svg?height=200&width=200" },
    { id: 6, image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <MainLayout>
      <main className="w-full bg-[#F9FAFB] text-[#1A1A1A] accent-[#3B82F6] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:accent-[#60A5FA]">
        {/* Hero Section (Main Banner) */}
        <section className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={main2}
            alt="Luxury furniture in a modern setting"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">
              Elevate Your <span className="text-amber-300">Space</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-xl mb-8">
              Discover furniture that transforms your home into a sanctuary of style and comfort.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-md transition-colors duration-300">
                Shop New Arrivals
              </button>
              <button className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-md transition-colors duration-300 border border-white/40">
                Explore Collections
              </button>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-amber-700 dark:text-amber-300 font-medium uppercase tracking-wider">
                  Just Landed
                </span>
                <h2 className="text-3xl font-serif font-bold dark:text-amber-100 text-zinc-800 mt-2">New Arrivals</h2>
              </div>
              <a
                href="/new"
                className="flex items-center text-amber-700 dark:text-amber-300 font-medium hover:underline"
              >
                View All New
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-4">
                    <div className="aspect-[4/5] relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <img
                        src={product.hoverImage || "/placeholder.svg"}
                        alt={`${product.name} - alternate view`}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-medium dark:text-amber-100 text-zinc-800 mb-1">{product.name}</h3>
                    <p className="text-amber-700 dark:text-amber-300 font-bold">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-serif font-bold dark:text-amber-100 text-zinc-800 mb-2">
                  Featured Collections
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Curated selections to inspire your next room transformation
                </p>
              </div>
              <a
                href="/collections"
                className="flex items-center text-amber-700 dark:text-amber-300 font-medium hover:underline"
              >
                View All Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCollections.map((collection) => (
                <div key={collection.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 text-amber-700 dark:text-amber-300 px-6 py-3 rounded-md font-medium translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      Explore Collection
                    </button>
                  </div>
                  <h3 className="text-xl font-serif font-bold dark:text-amber-100 text-zinc-800 mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{collection.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers / Trending Products */}
        <section className="py-20 bg-amber-50 dark:bg-zinc-800">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-serif font-bold dark:text-amber-100 text-zinc-800 mb-2">Best Sellers</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Our most loved pieces, chosen by our customers</p>
              </div>
              <a
                href="/best-sellers"
                className="flex items-center text-amber-700 dark:text-amber-300 font-medium hover:underline"
              >
                Shop All Best Sellers
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-4 bg-white dark:bg-zinc-900 rounded-lg">
                    <span className="absolute top-4 left-4 z-10 bg-amber-700 text-white text-xs px-2 py-1 rounded-md">
                      Best Seller
                    </span>
                    <div className="p-6">
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-[250px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                        />
                        <img
                          src={product.hoverImage || "/placeholder.svg"}
                          alt={`${product.name} - alternate view`}
                          className="w-full h-[250px] object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium dark:text-amber-100 text-zinc-800 mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-700 dark:text-amber-300 font-bold">{product.price}</span>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-zinc-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers / Discounts */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-lg h-[400px]">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Living room furniture on sale"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                <div className="absolute inset-0 p-12 flex flex-col justify-center">
                  <span className="text-amber-300 font-medium mb-2">Limited Time Offer</span>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">25% Off All Living Room</h3>
                  <p className="text-white/80 mb-6 max-w-xs">
                    Transform your living space with our premium selection at special prices.
                  </p>
                  <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md font-medium w-fit transition-colors duration-300">
                    Shop the Sale
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg h-[400px]">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Bedroom collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                <div className="absolute inset-0 p-12 flex flex-col justify-center">
                  <span className="text-amber-300 font-medium mb-2">New Collection</span>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">Bedroom Essentials</h3>
                  <p className="text-white/80 mb-6 max-w-xs">
                    Create your dream sanctuary with our latest bedroom collection.
                  </p>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-md font-medium w-fit transition-colors duration-300 border border-white/40">
                    Explore Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / Customer Reviews */}
        <section className="py-20 bg-amber-50 dark:bg-zinc-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold dark:text-amber-100 text-zinc-800 mb-2">
                What Our Customers Say
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Hear from our satisfied customers about their experience with Mebel House
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-sm">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-medium dark:text-amber-100 text-zinc-800">{testimonial.author}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us / Why Choose Us? */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-amber-700 dark:text-amber-300 font-medium">Our Story</span>
                <h2 className="text-3xl font-serif font-bold dark:text-amber-100 text-zinc-800 mt-2 mb-6">
                  Crafting Beautiful Spaces Since 2005
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  At Mebel House, we believe that your home should be a reflection of your personal style and a
                  sanctuary of comfort. For over 15 years, we've been dedicated to sourcing and creating furniture that
                  combines exceptional craftsmanship, innovative design, and sustainable practices.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  Each piece in our collection is thoughtfully designed to bring beauty and functionality to your space,
                  with attention to detail that ensures lasting quality.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center text-center p-4 bg-amber-50 dark:bg-zinc-800 rounded-lg">
                    <span className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">15+</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Years of Excellence</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-amber-50 dark:bg-zinc-800 rounded-lg">
                    <span className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">10k+</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Happy Customers</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-amber-50 dark:bg-zinc-800 rounded-lg">
                    <span className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">5k+</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Products</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-amber-50 dark:bg-zinc-800 rounded-lg">
                    <span className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">20+</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Design Awards</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Our showroom"
                  className="w-full h-[600px] object-cover rounded-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-amber-700 text-white p-6 rounded-lg max-w-xs">
                  <p className="font-serif italic mb-4">
                    "We're passionate about helping our customers create spaces they love."
                  </p>
                  <p className="font-medium">— Anna Johnson, Founder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Gallery */}
        <section className="py-20 bg-amber-50 dark:bg-zinc-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold dark:text-amber-100 text-zinc-800 mb-2">
                #MebelHouseLiving
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                See how our customers style their Mebel House furniture
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {instagramPosts.map((post) => (
                <div key={post.id} className="relative group overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Customer styled space"
                    className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href="#" className="text-white text-sm font-medium hover:underline">
                      View on Instagram
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-700 dark:text-amber-300 font-medium hover:underline"
              >
                Follow us on Instagram
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}

