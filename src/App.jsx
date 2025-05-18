import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Home from "./pages/Home";

const DashBoard = React.lazy(() => import("./pages/DashBoard"));
const Items = React.lazy(() => import("./components/items/Items"));
const AddItem = React.lazy(() => import("./components/items/AddItem"));
const GenerateBill = React.lazy(() => import("./components/bill/GenerateBill"));
const Bills = React.lazy(() => import("./components/bill/Bills"));
const Search = React.lazy(() => import("./components/search/Search"));
const Brands = React.lazy(() => import("./components/brand/Brands.jsx"));
const NotFound = React.lazy(() => import("./components/NoFound"));

const Categories = React.lazy(() =>
  import("./components/categories/Categories")
);
const CreateCategory = React.lazy(() =>
  import("./components/categories/CreateCategory.jsx")
);
const CreateBrand = React.lazy(() =>
  import("./components/brand/CreateBrand.jsx")
);
const UnderDevelopment = React.lazy(() =>
  import("./components/UnderDevelopment.jsx")
);

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* open  routes */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/products" element={<Items></Items>}></Route>
        <Route
          path="/under-dev"
          element={<UnderDevelopment></UnderDevelopment>}
        ></Route>

        <Route
          path="/dashboard"
          element={
            //  This  route is for logged in only
            //  as  customer and nboth can access
            <ProtectedRoute adminRoute={true}>
              <DashBoard></DashBoard>
            </ProtectedRoute>
          }
        >
          <Route
            path="items"
            element={
              <ProtectedRoute adminRoute={true}>
                <Items></Items>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="items/add"
            element={
              <ProtectedRoute adminRoute={true}>
                <AddItem></AddItem>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="items/:id/update"
            element={
              <ProtectedRoute adminRoute={true}>
                <AddItem></AddItem>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="bill/generate"
            element={
              <ProtectedRoute adminRoute={true}>
                <GenerateBill></GenerateBill>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="bills"
            element={
              <ProtectedRoute adminRoute={true}>
                <Bills></Bills>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="categories"
            element={
              <ProtectedRoute adminRoute={true}>
                <Categories></Categories>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="categories/create"
            element={
              <ProtectedRoute adminRoute={true}>
                <CreateCategory></CreateCategory>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="brands"
            element={
              <ProtectedRoute adminRoute={true}>
                <Brands></Brands>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="brands/create"
            element={
              <ProtectedRoute adminRoute={true}>
                <CreateBrand></CreateBrand>
              </ProtectedRoute>
            }
          ></Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
