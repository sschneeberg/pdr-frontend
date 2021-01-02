import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Nav(props) {
    console.log(props.socket);
    return (
        <div className="">
            <nav className=" navbar navbar-dark bg-dark  ">
                <Link className="navbar-brand" to="/">
                    Pest Damage Report
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample07"
                    aria-controls="#navbarsExample07"
                    aria-label="Toggle Navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <div className="collapse navbar-collapse bg-dark" id="navbarsExample07">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/">
                            Submit Bug
                        </NavLink>
                    </li>
                </ul>
                {props.isAuth ? (
                    <ul className="navbar-nav ml-auto">
                        {props.user.permissions ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/chat">
                                    Customer Support
                                </NavLink>
                            </li>
                        ) : null}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link logout-link" onClick={props.handleLogout} to="/">
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">
                                Create Account
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
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
