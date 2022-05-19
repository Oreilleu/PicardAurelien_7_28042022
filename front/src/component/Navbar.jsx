import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    // Mettre variable context

    // Faire variable UserId
    // Faire le ternaire savoir si uid est co

    // Recup userId voir si l'uitilisateur est connecter
    // si il est co afficher bonjour + nom et un bouton deconecter
    // si est pas co ne rien afficher logo au center
    return (
        <div className="navbar-container">
            <NavLink exact to="/">
                <div className="logo">
                    <img src="./img/icon-left-font.png" alt="logo groupomania" />
                </div>
            </NavLink>
            <div className="account">
                Gestion du compte
            </div>
            <div className="coonect">
                Se déconnecter
            </div>
        </div>
    )
}