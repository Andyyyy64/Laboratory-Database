import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
export const Header: React.FC = () => {
    const authContext = React.useContext(AuthContext);
    if (authContext === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    const { user } = authContext;
    const navi = useNavigate();

    const handleLaboClick = (labo_id: number) => {
        navi(`/labo/${labo_id}`);
    }

    const handleProfileClick = () => {
        navi(`/profile`);
    }

    return (
      <>
        <div className="bg-cover bg-white p-10 flex justify-between items-center">
          <a href="/">
            <h1 className="logo">
              LABORATORY
              <br /> DATABASE
            </h1>
          </a>
          <div className="flex space-x-4">
            <a href="/" className="zoo">
              TOP
            </a>
            <a
              onClick={() => handleProfileClick()}
              className="zoo cursor-pointer"
            >
              PROFILE
            </a>
            {user?.labo_id ? (
              <a
                onClick={() => handleLaboClick(user.labo_id)}
                className=" zoo text-black font-bold cursor-pointer hover:text-blue"
              >
                MYLABO
              </a>
            ) : (
              <></>
            )}
            <a href="/contact" className="zoo">
              CONTACT
            </a>
          </div>
        </div>
      </>
    );
}
