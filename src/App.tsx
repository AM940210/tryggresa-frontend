import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import BookningConfirmation from "./pages/BookningConfirmation";
import SelectTimePage from "./pages/SelectTimePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MinProfilPage from "./pages/MinProfilpage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Toaster position="top-center" />

        <Routes>
          {/* Stardsida */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-time" element={<SelectTimePage />} />
          {/* Bekräftelsesida */}
          <Route path="/confirmation" element={<BookningConfirmation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/min-profil" element={<ProtectedRoute><MinProfilPage /></ProtectedRoute>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
