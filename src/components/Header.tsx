import { useState } from "react";
import logo from "../assets/Logo.png";
import { Home, Search, User, Menu, X, Globe2, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-2 px-4">
        
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

          {/* Left side menu */}
          <ul className="flex items-center gap-6">
            <li className="hover:text-blue-600">Mina bokningar</li>
            <li className="hover:text-blue-600">Min profil</li>
            <li className="hover:text-blue-600">Kundservice</li>
          </ul>

          {/* Separator */}
          <div className="w-px h-8 bg-gray-400 mx-4"></div>

          {/* Right side menu */}
          <ul className="flex items-center gap-6">
            <li className="flex items-center hover:text-blue-600 gap-2">
              <Search size={18} />
              Sök
            </li>

            <li className="flex items-center hover:text-blue-600 gap-2">
              <User size={18} />
              Logga in
            </li>

            <li className="flex items-center hover:text-blue-600 gap-2">
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
        <div className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col gap-0.5 text-gray-700 font-medium text-2xl ">
            <li className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600">
              <Home size={32} /> Hem
            </li>
            <li className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600">
              <Search size={32} /> Sök
            </li>
            <li className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600">
              <User size={32} /> Logga in / Registera dig
            </li>
            <li className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600">
              <Headphones size={32} /> Kundservice
            </li>
            <li className="flex items-center gap-10 pl-6 bg-gray-200 p-4 hover:text-blue-600 mt-2">
              <Globe2 size={32} /> Switch to English
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
