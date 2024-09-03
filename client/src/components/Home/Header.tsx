import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const authContext = React.useContext(AuthContext);
    if (authContext === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    const { user } = authContext;
    const navi = useNavigate();

    const handleLaboClick = (labo_id: number) => {
        navi(`/labo/${labo_id}`);
        setMenuOpen(false);
    }

    const handleProfileClick = () => {
        navi(`/profile`);
        setMenuOpen(false);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
      <div className="bg-cover bg-white p-4 sm:p-10 flex justify-between items-center">
        <a href="/" className="text-center sm:text-left">
          <h1
            className="text-xl sm:text-2xl font-bold"
            style={{ color: "#1D8B9A" }}
          >
            LABORATORY
            <br /> DATABASE
          </h1>
        </a>
        <div className="sm:hidden relative">
          <button
            onClick={toggleMenu}
            className="focus:outline-none absolute -bottom-7 right-3"
          >
            {menuOpen ? (
              <CloseIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </button>
          {menuOpen && (
            <div className="absolute top-7 right-0 mt-2 w-24 bg-gray-300 shadow-lg rounded-lg z-10">
              <a href="/" className="block px-4 py-2 text-black font-normal">
                TOP
              </a>
              <a
                onClick={handleProfileClick}
                className="block px-4 py-2 text-black font-normal cursor-pointer"
              >
                PROFILE
              </a>
              {user?.labo_id && (
                <a
                  onClick={() => handleLaboClick(user.labo_id)}
                  className="block px-4 py-2 text-black font-normal cursor-pointer hover:text-blue"
                >
                  MYLABO
                </a>
              )}
              <a
                href="/contact"
                className="block px-4 py-2 text-black font-normal"
              >
                CONTACT
              </a>
            </div>
          )}
        </div>
        <div className="hidden sm:flex space-x-4">
          <a href="/" className="zoo text-black font-medium">
            TOP
          </a>
          <a
            onClick={handleProfileClick}
            className="zoo text-black font-medium cursor-pointer"
          >
            PROFILE
          </a>
          {user?.labo_id && (
            <a
              onClick={() => handleLaboClick(user.labo_id)}
              className="zoo text-black font-bold cursor-pointer hover:text-blue"
            >
              MYLABO
            </a>
          )}
          <a href="/contact" className="zoo text-black font-medium">
            CONTACT
          </a>
        </div>
      </div>
    );
};
