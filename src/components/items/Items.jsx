import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "../../redux/slices/itemSlice";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";
import { toast } from "react-toastify";
import Search from "../search/Search";
import {
  getAllCategories,
  getItemsByCategory,
} from "../../redux/slices/categorySlice";
import { IndianRupee, MoveLeft } from "lucide-react";

const Items = () => {
  const items = useSelector((state) => state?.item?.items);
  const isLoading = useSelector((state) => state?.item?.isLoading);
  const isError = useSelector((state) => state?.item?.isError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/");
  let required_path = path[path.length - 1];
  const categories = useSelector((state) => state?.category?.categories);
  const particularCatItems = useSelector(
    (state) => state?.category?.particularCatItems
  );
  const particularItem = useSelector((state) => {
    return state.item.particularItem;
  });

  //  as of now ,  create three state variables  to show and hide
  //  we will optimise it later  on

  const [showItems, setShowItems] = useState(true);
  const [catItems, setCatItems] = useState(false);
  const [showParticularItem, setShowParticularItem] = useState(false);

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <ErrorDisplay></ErrorDisplay>;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          {required_path === "products" && (
            <button
              className="btn btn-outline-primary m-1"
              onClick={() => {
                navigate("/");
              }}
            >
              <MoveLeft></MoveLeft>
            </button>
          )}
          <h2 className="text-primary mb-0">
            <i className="bi bi-box me-2"></i>Item List
          </h2>
          <Search
            setShowItems={setShowItems}
            setCatItems={setCatItems}
            setShowParticularItem={setShowParticularItem}
          ></Search>

          {/*  categories */}
          <div className="d-flex flex-wrap justify-content-start gap-2 mb-3">
            <button
              className="btn btn-secondary m-1"
              onClick={() => {
                setCatItems(false);
                setShowItems(true);
                setShowParticularItem(false);
              }}
            >
              All
            </button>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <button
                  key={index}
                  className="btn btn-outline-primary m-1"
                  onClick={() => {
                    dispatch(getItemsByCategory({ _id: category?._id }));
                    setCatItems(true);
                    setShowItems(false);
                    setShowParticularItem(false);
                  }}
                >
                  {category.category_name}
                </button>
              ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            {required_path !== "products" && (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/dashboard/items/add")}
              >
                <i className="bi bi-plus-lg me-2"></i>Add New Item
              </button>
            )}
          </div>
          {/*  display cat items */}

          {showParticularItem && (
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow hover-shadow transition-all">
                <div className="position-relative">
                  <img
                    src={
                      particularItem?.item_img ||
                      "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg"
                    }
                    className="card-img-top"
                    alt={particularItem?.item_name}
                    style={{
                      height: "250px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-truncate mb-3">
                    {particularItem?.item_name}
                  </h5>
                  <p className="card-text text-muted mb-3">
                    {particularItem?.item_desc}
                  </p>

                  <p className="card-text text-muted ">
                    <IndianRupee
                      style={{ height: "25px", width: "18px" }}
                    ></IndianRupee>{" "}
                    {particularItem?.item_price?.toFixed(2)}
                  </p>

                  {required_path === "products" && (
                    <button
                      className="btn btn-outline-primary w-50"
                      onClick={() => navigate("/under-dev")}
                    >
                      <i className="bi bi-pencil me-2"></i>Buy Now
                    </button>
                  )}

                  {required_path !== "products" && (
                    <div className="d-flex gap-2 mt-auto">
                      <button
                        className="btn btn-outline-danger w-50"
                        onClick={() =>
                          dispatch(
                            deleteItem({ _id: particularItem._id })
                          ).then((action) => {
                            if (action?.payload?.success) {
                              toast.success(action?.payload?.message);
                            } else {
                              toast.error(action?.payload?.message);
                            }
                          })
                        }
                      >
                        <i className="bi bi-trash me-2"></i>Delete
                      </button>
                      <button
                        className="btn btn-outline-primary w-50"
                        onClick={() =>
                          navigate(
                            `/dashboard/items/${particularItem._id}/update`
                          )
                        }
                      >
                        <i className="bi bi-pencil me-2"></i>Update
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {catItems &&
            (particularCatItems.length > 0 ? (
              <div className="row g-4">
                {particularCatItems.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow hover-shadow transition-all">
                      <div className="position-relative">
                        <img
                          src={
                            item?.item_img ||
                            "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg"
                          }
                          className="card-img-top"
                          alt={item?.item_name}
                          style={{
                            height: "250px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-truncate mb-3">
                          {item?.item_name}
                        </h5>
                        <p className="card-text text-muted mb-3">
                          {item?.item_desc}
                        </p>

                        <p className="card-text text-muted ">
                          <IndianRupee
                            style={{ height: "25px", width: "18px" }}
                          ></IndianRupee>{" "}
                          {item?.item_price.toFixed(2)}
                        </p>

                        {required_path === "products" && (
                          <button
                            className="btn btn-outline-primary w-50"
                            onClick={() => navigate("/under-dev")}
                          >
                            <i className="bi bi-pencil me-2"></i>Buy Now
                          </button>
                        )}

                        {required_path !== "products" && (
                          <div className="d-flex gap-2 mt-auto">
                            <button
                              className="btn btn-outline-danger w-50"
                              onClick={() =>
                                dispatch(deleteItem({ _id: item._id })).then(
                                  (action) => {
                                    if (action?.payload?.success) {
                                      toast.success(action?.payload?.message);
                                    } else {
                                      toast.error(action?.payload?.message);
                                    }
                                  }
                                )
                              }
                            >
                              <i className="bi bi-trash me-2"></i>Delete
                            </button>
                            <button
                              className="btn btn-outline-primary w-50"
                              onClick={() =>
                                navigate(`/dashboard/items/${item._id}/update`)
                              }
                            >
                              <i className="bi bi-pencil me-2"></i>Update
                            </button>
                          </div>
                        )}
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
            ))}

          {showItems &&
            (items.length > 0 ? (
              <div className="row g-4">
                {items?.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow hover-shadow transition-all">
                      <div className="position-relative">
                        <img
                          src={
                            item?.item_img ||
                            "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg"
                          }
                          className="card-img-top"
                          alt={item?.item_name}
                          style={{
                            height: "250px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-truncate mb-3">
                          {item?.item_name}
                        </h5>
                        <p className="card-text text-muted mb-3">
                          {item?.item_desc}
                        </p>

                        <p className="card-text text-muted ">
                          <IndianRupee
                            style={{ height: "25px", width: "18px" }}
                          ></IndianRupee>{" "}
                          {item?.item_price?.toFixed(2)}
                        </p>

                        {required_path === "products" && (
                          <button
                            className="btn btn-outline-primary w-50"
                            onClick={() => navigate("/under-dev")}
                          >
                            <i className="bi bi-pencil me-2"></i>Buy Now
                          </button>
                        )}

                        {required_path !== "products" && (
                          <div className="d-flex gap-2 mt-auto">
                            <button
                              className="btn btn-outline-danger w-50"
                              onClick={() =>
                                dispatch(deleteItem({ _id: item._id })).then(
                                  (action) => {
                                    if (action?.payload?.success) {
                                      toast.success(action?.payload?.message);
                                    } else {
                                      toast.error(action?.payload?.message);
                                    }
                                  }
                                )
                              }
                            >
                              <i className="bi bi-trash me-2"></i>Delete
                            </button>
                            <button
                              className="btn btn-outline-primary w-50"
                              onClick={() =>
                                navigate(`/dashboard/items/${item._id}/update`)
                              }
                            >
                              <i className="bi bi-pencil me-2"></i>Update
                            </button>
                          </div>
                        )}
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
