import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/home/Home";
import CategoryPage from "./pages/category/CategoryPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/auth/Login";
import SingUp from "./pages/auth/SingUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Force reload on route change
    window.location.reload();
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/auth/sing-in" element={<Login />} />
          <Route path="/auth/sing-up" element={<SingUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
