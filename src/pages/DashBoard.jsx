import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div>
      <p> This is a DashBoard</p>

      <NavLink to={"/dashboard/items"}> Items</NavLink>
      <br />
      <br />
      <NavLink to={"/dashboard/items/add"}> Add Item</NavLink>

      <br />
      <br />

      <Outlet></Outlet>
    </div>
  );
};

export default DashBoard;
