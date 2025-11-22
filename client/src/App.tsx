import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShipmentsPage from "./pages/ShipmentsPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/shipments" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/shipments" /> : <RegisterPage />}
        />
        <Route
          path="/shipments"
          element={token ? <ShipmentsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={token ? <Navigate to="/shipments" /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
