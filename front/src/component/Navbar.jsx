import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./Appcontext"
import Logout from "./Log/Logout";
import EditProfil from "./EditProfil";

export default function Navbar() {
    // Mettre variable context
    const userId = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)


    // si il est co afficher bonjour + nom et un bouton deconecter
    // si est pas co ne rien afficher logo au center
    return (
        <div className="nav-container">
            <div className="logo-container">
                <NavLink exact to="/">
                    <div className="logo">
                        <img src="./img/icon-left-font.png" alt="logo groupomania" />
                    </div>
                </NavLink>
            </div>
            <div className="hello-container">
                {
                    userId ? (<ul className="ul-hello">
                        <li className="li-hello">
                            <NavLink exact to="/">
                                <h3>Bonjour {userData.pseudo}</h3>
                            </NavLink>
                        </li>
                        <li className="li-hello">
                            <ul>
                                <li className="logout-account" onClick={EditProfil}>PROFIL</li>
                                <Logout />
                            </ul>
                        </li>
                    </ul>) : null
                }
            </div>
        </div>
    )
}