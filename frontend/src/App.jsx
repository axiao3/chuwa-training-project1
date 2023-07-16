import "./App.css";
import Reused from "./pages/Reused";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <Router>
          <Routes>
            <Route path="/" element={<div>home</div>} />
            <Route path="/sign-up" element={<Reused type="Sign Up" />} />
            <Route path="/sign-in" element={<Reused type="Sign In" />} />
            <Route
              path="/forget-password"
              element={<Reused type="Forget Password" />}
            />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
