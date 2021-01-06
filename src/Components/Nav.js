import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div className="">
            <nav className=" navbar nav-color  ">
                <Link className="navbar-brand" id='brand' to="/">
                    Pest Damage Report
                </Link>
            </nav>
            <div className="nav" id="navbarsExample07">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <NavLink className="nav-link" id='submit-bug' exact to="/">
                            Submit Bug
                        </NavLink>
                    </li>
                </ul>
                {props.isAuth ? (
                    <ul className="">
                        {props.user.permissions ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" id='customer-support' to="/chat">
                                    Customer Support
                                </NavLink>
                            </li>
                        ) : null}
                        <li className="nav-item">
                            <NavLink className="nav-link" id='dashboard' to="/home">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link logout-link" id='logout' onClick={props.handleLogout} to="/">
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav2">
                        <li className="nav-item">
                            <NavLink className="nav-link" id='about' to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" id='create-account' to="/signup">
                                Create Account
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" id='login' to="/login">
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
