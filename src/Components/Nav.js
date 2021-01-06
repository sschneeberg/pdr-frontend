import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div className="">
            <nav className=" navbar nav-color  ">
                <Link className="navbar-brand" id='brand' to="/" style={{fontFamily: "bebas neue"}}>
                    Pest Damage Report
                </Link>
            </nav>
            <div className="nav" id="navbarsExample07">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <NavLink className="nav-link" id='submit-bug' exact to="/" style={{fontFamily: "bebas neue"}}>
                            Submit Bug
                        </NavLink>
                    </li>
                </ul>
                {props.isAuth ? (
                    <ul className="">
                        {props.user.permissions ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" id='customer-support' to="/chat" style={{fontFamily: "bebas neue"}}>
                                    Customer Support
                                </NavLink>
                            </li>
                        ) : null}
                        <li className="nav-item">
                            <NavLink className="nav-link" id='dashboard' to="/home" style={{fontFamily: "bebas neue"}}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link logout-link" id='logout' onClick={props.handleLogout} to="/" style={{fontFamily: "bebas neue"}}>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav2">
                        <li className="nav-item">
                            <NavLink className="nav-link" id='about' to="/about" style={{fontFamily: "bebas neue"}}>
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" id='create-account' to="/signup" style={{fontFamily: "bebas neue"}}>
                                Create Account
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" id='login' to="/login" style={{fontFamily: "bebas neue"}}>
                                Login
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Nav;
