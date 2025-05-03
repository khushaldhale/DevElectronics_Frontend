import React, { useState } from "react";
import { ShoppingCart, Eye, Heart, Star, StarHalf } from "lucide-react";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "headphones", name: "Headphones" },
    { id: "speakers", name: "Speakers" },
    { id: "dj", name: "DJ Equipment" },
    { id: "accessories", name: "Accessories" },
  ];

  const products = [
    {
      id: 1,
      name: "AudioTech Pro X500 Headphones",
      category: "headphones",
      price: 349.99,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1600",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "SoundWave Bluetooth Speaker",
      category: "speakers",
      price: 199.99,
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1600",
      badge: "New",
    },
    {
      id: 3,
      name: "MixMaster Pro DJ Controller",
      category: "dj",
      price: 649.99,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/4090902/pexels-photo-4090902.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 4,
      name: "BassBoost Studio Monitors (Pair)",
      category: "speakers",
      price: 499.99,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1600",
      badge: "20% OFF",
    },
    {
      id: 5,
      name: "PrecisionSound Noise-Cancelling Earbuds",
      category: "headphones",
      price: 179.99,
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 6,
      name: "AudioCable Premium XLR Set",
      category: "accessories",
      price: 49.99,
      rating: 4.4,
      image:
        "https://images.pexels.com/photos/1487908/pexels-photo-1487908.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="products" className="section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-secondary text-white px-3 py-2 mb-3">
            Featured Products
          </span>
          <h2 className="display-5 fw-bold mb-3">Shop Our Collection</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Browse our carefully curated selection of premium audio equipment
            and accessories.
          </p>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn ${
                activeCategory === category.id
                  ? "btn-primary"
                  : "btn-outline-secondary"
              } px-4 rounded-pill`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                <div className="position-relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                  />

                  {product.badge && (
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-accent text-dark">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="position-absolute top-0 end-0 m-3">
                    <button className="btn btn-light rounded-circle shadow-sm p-2 me-1">
                      <Heart size={16} />
                    </button>
                    <button className="btn btn-light rounded-circle shadow-sm p-2">
                      <Eye size={16} />
                    </button>
                  </div>

                  <div
                    className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-3 translate-middle-y opacity-0 transition-all"
                    style={{ transform: "translateY(100%)" }}
                  >
                    <div className="d-grid">
                      <button className="btn btn-accent">
                        <ShoppingCart size={16} className="me-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-2">{product.name}</h3>

                  <div className="d-flex align-items-center mb-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => {
                        if (i < Math.floor(product.rating)) {
                          return (
                            <Star
                              key={i}
                              size={18}
                              className="text-warning"
                              fill="#ffc107"
                            />
                          );
                        } else if (
                          i < Math.ceil(product.rating) &&
                          !Number.isInteger(product.rating)
                        ) {
                          return (
                            <StarHalf
                              key={i}
                              size={18}
                              className="text-warning"
                              fill="#ffc107"
                            />
                          );
                        } else {
                          return (
                            <Star key={i} size={18} className="text-muted" />
                          );
                        }
                      })}
                    <span className="ms-2 small text-muted">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="btn btn-sm btn-primary">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="#" className="btn btn-primary btn-lg px-5">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
