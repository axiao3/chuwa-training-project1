import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import CreateItem from "./pages/CreateItemPage";
import EditItem from "./pages/EditItemPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";

import { useState } from "react";

function App() {
  const [blur, setBlur] = useState(false);
  return (
    <div className="app">
      <Router>
        <ErrorBoundary fallback={<ErrorPage />}>
          <Header setBlur={setBlur} />
          <div className={"app-content" + (blur ? " blur" : "")}>
            <Routes>
              <Route path="/" element={<ItemsPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/update-password" element={<UpdatePasswordPage />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/items/:id" element={<ItemDetailPage />} />
              <Route path="/items/create" element={<CreateItem />} />
              <Route path="/items/:id/edit" element={<EditItem />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
