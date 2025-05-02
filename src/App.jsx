import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Items from "./components/items/Items";
import AddItem from "./components/items/AddItem";

const App = () => {
  return (
    <div>
      <p className=""> This is an App component</p>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<DashBoard></DashBoard>}>
          <Route path="items" element={<Items></Items>}></Route>
          <Route path="items/add" element={<AddItem></AddItem>}></Route>
          <Route path="items/:id/update" element={<AddItem></AddItem>}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
