import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./Appcontext"
import Logout from "./Log/Logout";

export default function Navbar() {
    // Mettre variable context
    const userId = useContext(UidContext)

    // Faire variable UserId
    // Faire le ternaire savoir si uid est co

    // Recup userId voir si l'uitilisateur est connecter
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
                                <h3>Bonjour NOM UTILISATEUR</h3>
                            </NavLink>
                        </li>
                        <li className="li-hello">
                            <ul>
                                <li>COMPTE</li>
                                <Logout />
                            </ul>
                        </li>
                    </ul>) : (
                        <div className="login">
                            <NavLink exact to='/'>
                                <h3>Se connecter</h3>
                            </NavLink>
                        </div>
                    )
                }
            </div>
        </div>
    )
}