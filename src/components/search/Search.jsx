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
        console.log("change the status here ");
        setShowParticularItem(true);
        setCatItems(false);
        setShowItems(false);
      }
    });
  }

  return (
    <div className="container mt-4">
      <form onSubmit={submitHandler} className="d-flex mb-2">
        <input
          type="text"
          name="search"
          placeholder="Enter the name of the item"
          className="form-control me-2"
          onChange={handleInputChange}
          value={product}
        />
        <button className="btn btn-primary">Search Item</button>
      </form>

      {suggestions?.length > 0 && (
        <ul className="list-group">
          {suggestions.map((element, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => {
                setProduct(element.item_name);
                setProductId(element._id);
                dispatch(removeSuggestions());
              }}
              style={{ cursor: "pointer" }}
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
