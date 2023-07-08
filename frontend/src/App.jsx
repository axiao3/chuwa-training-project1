import "./App.css";
import Reused from "./pages/Reused";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <Router>
          <Routes>
            <Route path="/sign-up" element={<Reused type="Sign Up" />} />
            <Route path="/sign-in" element={<Reused type="Sign In" />} />
            <Route path="/:username" element={<div>userdashboard</div>} />
            <Route
              path="/forget-password"
              element={<Reused type="Forget Password" />}
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
