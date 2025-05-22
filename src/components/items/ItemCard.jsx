import { IndianRupee } from "lucide-react";
import { toast } from "react-toastify";

const ItemCard = ({
  index,
  item,
  required_path,
  dispatch,
  deleteItem,
  navigate,
}) => {
  return (
    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-3">
        <div className="position-relative">
          <img
            src={
              item?.item_img ||
              "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg"
            }
            className="card-img-top rounded-top-3"
            alt={item?.item_name}
            style={{
              height: "250px",
              width: "100%",
              objectFit: "contain",
              backgroundColor: "#f2f2f2",
            }}
          />
        </div>
        <div className="card-body d-flex flex-column px-3 py-3">
          <p
            className="text-truncate mb-2"
            style={{ color: "#555", fontSize: "0.95rem" }}
          >
            {item?.item_name}
          </p>

          <p
            className="mb-3 d-flex align-items-center gap-1"
            style={{ color: "#666", fontSize: "0.9rem" }}
          >
            <IndianRupee style={{ height: "18px", width: "15px" }} />
            {item?.item_price?.toFixed(2)}
          </p>

          {required_path === "products" && (
            <button
              className="btn btn-outline-primary btn-sm w-100 rounded-pill"
              onClick={() => navigate(`/under-dev`)}
            >
              <i className="bi bi-pencil me-1"></i>Buy Now
            </button>
          )}

          {required_path !== "products" && required_path !== "categories" && (
            <div className="d-flex gap-2 mt-auto">
              <button
                className="btn btn-outline-danger btn-sm w-50 rounded-pill"
                onClick={() =>
                  dispatch(deleteItem({ _id: item._id })).then((action) => {
                    toast[action?.payload?.success ? "success" : "error"](
                      action?.payload?.message
                    );
                  })
                }
              >
                <i className="bi bi-trash me-1"></i>Delete
              </button>
              <button
                className="btn btn-outline-primary btn-sm w-50 rounded-pill"
                onClick={() => navigate(`/dashboard/items/${item._id}/update`)}
              >
                <i className="bi bi-pencil me-1"></i>Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
