import "./App.css";
import Reused from "./pages/Reused";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreateItem from "./pages/createItemPage";
import EditItem from "./pages/EditItemPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { useState } from "react";

function App() {
  const [blur, setBlur] = useState(false);
  return (
    <div className="app">
      <Router>
        <Header setBlur={setBlur} />
        <div className={"app-content" + (blur ? " blur" : "")}>
          <Routes>
            <Route path="/" element={<ItemsPage />} />
            <Route path="/sign-up" element={<Reused type="Sign Up" />} />
            <Route path="/sign-in" element={<Reused type="Sign In" />} />
            <Route
              path="/forget-password"
              element={<Reused type="Forget Password" />}
            />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/items/create" element={<CreateItem />} />
            <Route path="/items/:id/edit" element={<EditItem />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
);
}

export default App;
