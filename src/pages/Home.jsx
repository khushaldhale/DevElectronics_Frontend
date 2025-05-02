import { motion } from "framer-motion";
import {
  HeadphonesIcon,
  WrenchIcon,
  TruckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const services = [
    {
      title: "Audio Sales",
      icon: HeadphonesIcon,
      desc: "Premium quality audio equipment",
    },
    { title: "Repairs", icon: WrenchIcon, desc: "Expert technical repairs" },
    {
      title: "Installation",
      icon: TruckIcon,
      desc: "Professional setup services",
    },
    { title: "Support", icon: PhoneIcon, desc: "24/7 Customer support" },
  ];

  const products = [
    { name: "Studio Monitors", price: "$499", img: "/placeholder-monitor.jpg" },
    {
      name: "DJ Controllers",
      price: "$799",
      img: "/placeholder-controller.jpg",
    },
    { name: "Headphones", price: "$299", img: "/placeholder-headphones.jpg" },
    { name: "Microphones", price: "$199", img: "/placeholder-mic.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Navbar */}
      <nav className="bg-indigo-900 text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl">🎛️</span>
            <h1 className="text-2xl font-bold">Dev Electronics</h1>
          </motion.div>
          <div className="flex space-x-6">
            {["Home", "Products", "Services", "About", "Contact"].map(
              (item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.05, color: "#a5b4fc" }}
                  className="cursor-pointer"
                >
                  {item}
                </motion.a>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Premium Audio Solutions</h1>
          <p className="text-xl mb-8">Experience sound like never before</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-500 px-8 py-3 rounded-full text-lg font-semibold"
          >
            Explore Products
          </motion.button>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <service.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-indigo-600 font-semibold">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Dev Electronics</h3>
            <p>123 Audio Street</p>
            <p>Sound City, CA 12345</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: info@develectronics.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "Instagram"].map((platform) => (
                <motion.a
                  key={platform}
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
