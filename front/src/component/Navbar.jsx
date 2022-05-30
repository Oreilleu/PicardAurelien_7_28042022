import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./Appcontext"
import Logout from "./Log/Logout";
import Profil from "./Profil";

export default function Navbar() {
    // Mettre variable context
    const userId = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)

    // Je veux savoir si profil est true ou false et le faire remonter a la page trending

    // Mettre dans redux
    const [isProfil, setIsProfil] = useState(false);

    const handleProfil = () => {
        if (isProfil === false) {
            setIsProfil(true);
            console.log(isProfil);
        } else {
            setIsProfil(false);
            console.log(isProfil);
        }
    };

    return (<>
        <div className="nav-container">
            <div className="logo-container">
                {userId ? (<NavLink exact to="/trending">
                    <div className="logo">
                        <img src="./img/icon-left-font.png" alt="logo groupomania" />
                    </div>
                </NavLink>) : (<NavLink exact to="/">
                    <div className="logo">
                        <img src="./img/icon-left-font.png" alt="logo groupomania" />
                    </div>
                </NavLink>)}

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
                                <NavLink exact to="/trending">
                                    <li className="logout-account" onClick={handleProfil} >PROFIL</li>
                                </NavLink>
                                <Logout />
                            </ul>
                        </li>
                    </ul>) : null
                }
            </div>



        </div>
        {
            isProfil ? <div className="profil">
                <Profil />
            </div>
                : null
        }
    </>
    )
}