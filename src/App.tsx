import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import BookningConfirmation from "./pages/BookningConfirmation";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster position="top-center" />

      <Routes>
        {/* Stardsida */}
        <Route path="/" element={<LandingPage />} />

        {/* Bekräftelsesida */}
        <Route path="/confirmation" element={<BookningConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}
