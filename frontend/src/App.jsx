import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/home/Home";
import CategoryPage from "./pages/category/CategoryPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
