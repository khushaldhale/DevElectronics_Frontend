import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "../../redux/slices/itemSlice";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const items = useSelector((state) => {
    return state.item.items;
  });

  const isLoading = useSelector((state) => {
    return state.item.isLoading;
  });
  const isError = useSelector((state) => {
    return state.item.isError;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllItems()).then((action) => {});
  }, []);

  if (isLoading) {
    return <p>Loading .....</p>;
  }

  if (isError) {
    return <p>Something went wrong </p>;
  }

  return (
    <div>
      <p>This all are items</p>
      {items.length > 0 ? (
        items.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.item_name}</p>
              <p>{item.item_desc}</p>
              <p>{item.price}</p>
              {/* how can we get ridd off this, so many event listeners are attached for delete item */}
              <button
                onClick={() => {
                  dispatch(deleteItem({ _id: item._id }));
                }}
              >
                delete item{" "}
              </button>
              <br />
              <button
                onClick={() => {
                  navigate(`/dashboard/items/${item._id}/update`);
                }}
              >
                update button
              </button>
            </div>
          );
        })
      ) : (
        <p>NO items are created yet </p>
      )}
    </div>
  );
};

export default Items;
