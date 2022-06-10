import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./Appcontext"
import Logout from "./Log/Logout";
import Profil from "./Profil";

export default function Navbar() {
    const userId = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)

    const [isProfil, setIsProfil] = useState(false);

    const handleProfil = () => {
        if (isProfil === false) {
            setIsProfil(true);
        } else {
            setIsProfil(false);
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
                <Profil isProfil={isProfil} setIsProfil={setIsProfil} />
            </div>
                : null
        }
    </>
    )
}