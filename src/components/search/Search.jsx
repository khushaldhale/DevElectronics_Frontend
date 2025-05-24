import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuggestions,
  particularItem,
  removeSuggestions,
} from "../../redux/slices/itemSlice";

const Search = ({ setShowItems, setCatItems, setShowParticularItem }) => {
  const [product, setProduct] = useState("");
  const [productId, setProductId] = useState("");
  const suggestions = useSelector((state) => state.item.suggestions);
  const dispatch = useDispatch();

  function debounce(suggestion, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        suggestion(...args);
      }, delay);
    };
  }

  const autoSuggest = debounce((value) => {
    dispatch(getSuggestions({ item_name: value }));
  }, 300);

  const handleInputChange = (event) => {
    setProduct(event.target.value);
    autoSuggest(event.target.value);
  };

  function submitHandler(event) {
    event.preventDefault();
    dispatch(particularItem({ _id: productId })).then((action) => {
      if (action.payload.success) {
        setShowParticularItem(true);
        setCatItems(false);
        setShowItems(false);
      }
    });
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="d-flex align-items-center"
        style={{ gap: "0.5rem" }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search item..."
          className="form-control form-control-md"
          style={{ maxWidth: "320px" }}
          onChange={handleInputChange}
          value={product}
        />
        <button className="btn btn-md btn-primary">Search</button>
      </form>

      {suggestions?.length > 0 && (
        <ul className="list-group mt-1">
          {suggestions.map((element, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action py-1 px-2"
              onClick={() => {
                setProduct(element.item_name);
                setProductId(element._id);
                dispatch(removeSuggestions());
              }}
              style={{ cursor: "pointer", fontSize: "0.9rem" }}
            >
              {element.item_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
