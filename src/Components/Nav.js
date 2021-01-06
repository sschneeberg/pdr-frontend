import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div className="">
            <nav className=" navbar nav-color  ">
                <Link className="navbar-brand" id='brand' to="/" style={{fontFamily: "bebas-neue"}}>
                    Pest Damage Report
                </Link>
            </nav>
            <div className="nav" id="navbarsExample07">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <NavLink className="nav-link" id='submit-bug' exact to="/" style={{fontFamily: "Helvetica"}}>
                            Submit Bug
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" id='about' to="/about" style={{fontFamily: "Helvetica"}}>
                            About
                        </NavLink>
                    </li>
                </ul>
                {props.isAuth ? (
                    <ul className="">
                        {props.user.permissions ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" id='customer-support' to="/chat" style={{fontFamily: "Helvetica"}}>
                                    Customer Support
                                </NavLink>
                            </li>
                        ) : null}
                        <li className="nav-item">
                            <NavLink className="nav-link" id='dashboard' to="/home" style={{fontFamily: "Helvetica"}}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link logout-link" id='logout' onClick={props.handleLogout} to="/" style={{fontFamily: "Helvetica"}}>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav2">
                        <li className="nav-item">
                            <NavLink className="nav-link" id='create-account' to="/signup" style={{fontFamily: "Helvetica"}}>
                                Create Account
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" id='login' to="/login" style={{fontFamily: "Helvetica"}}>
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
