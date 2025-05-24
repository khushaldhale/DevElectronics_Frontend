import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "../../redux/slices/itemSlice";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";

import {
  getAllCategories,
  getItemsByCategory,
} from "../../redux/slices/categorySlice";

import ItemHeader from "./ItemHeader";
import ItemCard from "./ItemCard";

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

  const [showItems, setShowItems] = useState(true);
  const [catItems, setCatItems] = useState(false);
  const [showParticularItem, setShowParticularItem] = useState(false);

  console.log(showItems, catItems, showParticularItem);

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay />;

  return (
    <div style={{ width: "100%", padding: "0 5px" }}>
      {/* Header Row with Logo, Search, and Categories */}
      <ItemHeader
        setCatItems={setCatItems}
        setShowItems={setShowItems}
        setShowParticularItem={setShowParticularItem}
        dispatch={dispatch}
        categories={categories}
        getItemsByCategory={getItemsByCategory}
        required_path={required_path}
      ></ItemHeader>

      {/* Display sections remain unchanged */}
      {showParticularItem && (
        <div className="row g-4">
          <ItemCard
            key={0}
            index={0}
            item={particularItem}
            required_path={required_path}
            dispatch={dispatch}
            deleteItem={deleteItem}
            navigate={navigate}
          ></ItemCard>
        </div>
      )}

      {/* Items List (either category or all) */}
      {!showParticularItem &&
        ((catItems ? particularCatItems : items).length > 0 ? (
          <div className="row g-4">
            {(catItems ? particularCatItems : items).map((item, index) => (
              <ItemCard
                key={index}
                index={index}
                item={item}
                required_path={required_path}
                dispatch={dispatch}
                deleteItem={deleteItem}
                navigate={navigate}
              ></ItemCard>
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            No items have been created yet.
          </div>
        ))}
    </div>
  );
};

export default Items;
