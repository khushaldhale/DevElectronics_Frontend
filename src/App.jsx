import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Items from "./components/items/Items";
import AddItem from "./components/items/AddItem";
import Home from "./pages/Home";
import "./App.css";
import GenerateBill from "./components/bill/GenerateBill";
import Bills from "./components/bill/Bills";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
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
        </Route>
      </Routes>
    </div>
  );
};

export default App;
