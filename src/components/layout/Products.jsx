import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../redux/slices/itemSlice";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // only 6 items are  shown here
  const items = useSelector((state) => {
    return state?.item?.items;
  }).slice(0, 6);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

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

        {items.length > 0 ? (
          <div className="row g-4">
            {items.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow hover-shadow transition-all">
                  <div className="position-relative">
                    <img
                      src={
                        item.item_img ||
                        "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg"
                      }
                      className="card-img-top"
                      alt={item.item_name}
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-truncate mb-3">
                      {item.item_name}
                    </h5>
                    <p className="card-text text-muted mb-3">
                      {item.item_desc}
                    </p>

                    <p className="card-text text-muted ">
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            No items have been created yet.
          </div>
        )}

        <div className="text-center mt-5">
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="btn btn-primary btn-lg px-5"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
