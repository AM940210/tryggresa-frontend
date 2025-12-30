import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { Home, Search, User, Menu, X, Globe2, Headphones, ClipboardList } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const [open, setOpen] = useState(false);

  // stäng mobilmenyn vid route-ändring
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full bg-white shadow-md relative z-40">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-2 px-4">
        
        {/** Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="h-20 w-auto cursor-pointer" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

          {/* left */}
          <ul className="flex items-center gap-6">
            {isAuthenticated && (
              <>
                <li
                  onClick={() => navigate("/mina-bokningar")} 
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Mina bokningar
                </li>
                <li
                  onClick={() => navigate("/min-profil")} 
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Min profil
                </li>
              </>
            )}
            
            <li
              onClick={() => navigate("/kundservice")} 
              className="hover:text-blue-600 cursor-pointer"
            >
              Kundservice
            </li>
          </ul>

          {/* Separator */}
          <div className="w-px h-8 bg-gray-400 mx-4"></div>

          {/* Right side menu */}
          <ul className="flex items-center gap-6">
            <li className="flex items-center hover:text-blue-600 gap-2 cursor-pointer">
              <Search size={18} />
              Sök
            </li>

            {isAuthenticated ? (
              <li
                onClick={logout}
                className="flex items-center hover:text-blue-600 gap-2 cursor-pointer"
              >
                <User size={18} />
                Logga ut
              </li>
            ) : (
              <li
                onClick={() => navigate("/login")}
                className="flex items-center hover:text-blue-600 gap-2 cursor-pointer"
              >
                <User size={18} />
                Logga in
              </li>
            )}
            

            <li className="flex items-center hover:text-blue-600 gap-2 cursor-pointer">
              <Globe2 size={18} />
              Svenska
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={48} /> : <Menu size={48} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t relative z-50">
          <ul className="flex flex-col gap-0.5 text-gray-700 font-medium text-2xl ">
            <li 
              onClick={() => navigate("/")}
              className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 cursor-pointer">
              <Home size={32} /> Hem
            </li>
            <li className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600">
              <Search size={32} /> Sök
            </li>

            {isAuthenticated ? (
              <li 
                onClick={logout}
                className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 cursor-pointer"
              >
                <User size={32} /> Logga ut
              </li>
            ) : (
              <li 
                onClick={() => navigate("/login")}
                className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 cursor-pointer"
              >
                <User size={32} /> Logga in
              </li>
            )}

            {isAuthenticated && (
              <>
                <li
                  onClick={() => navigate("/mina-bokningar")}
                  className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 cursor-pointer"
                >
                  <ClipboardList size={32} />
                  Mina bokningar
                </li>
                <li
                  onClick={() => navigate("/min-profil")}
                  className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 cursor-pointer"
                >
                  <User size={32} />
                  Min profil
                </li>
              </>
            )}
            
            

            <li
              onClick={() => navigate("/kundservice")}
              className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 cursor-pointer"
            >
              <Headphones size={32} /> Kundservice
            </li>
            <li className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 mt-2 cursor-pointer">
              <Globe2 size={32} /> Switch to English
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
