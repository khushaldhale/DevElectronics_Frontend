import React from "react";
import Logo from "../layout/Logo";
import Search from "../search/Search";

const ItemHeader = ({
  dispatch,
  setCatItems,
  setShowItems,
  setShowParticularItem,
  categories,
  getItemsByCategory,
  required_path,
}) => {
  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId === "all") {
      setCatItems(false);
      setShowItems(true);
      setShowParticularItem(false);
    } else {
      dispatch(getItemsByCategory({ _id: selectedId }));
      setCatItems(true);
      setShowItems(false);
      setShowParticularItem(false);
    }
  };

  return (
    <div className="container-fluid mb-3 p-2">
      <div className="row gy-3 flex-wrap gap-3 justify-content-between p-0 p-sm-3 align-items-center">
        {/* Logo - always on top in mobile, on the left on larger screens */}
        {required_path === "products" && (
          <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
            <Logo />
          </div>
        )}

        {/* Search */}
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Search
              setShowItems={setShowItems}
              setCatItems={setCatItems}
              setShowParticularItem={setShowParticularItem}
            />
          </div>
        </div>

        {/* Categories Dropdown */}
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <select
            className="form-select w-100"
            onChange={handleCategoryChange}
            style={{ maxWidth: "400px" }}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ItemHeader;
