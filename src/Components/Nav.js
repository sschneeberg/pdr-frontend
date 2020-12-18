import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div className="">
            <nav className=" navbar navbar-dark bg-dark  ">
                <Link className="navbar-brand" to="/">
                    MERN Auth
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="#navbarsExample07" aria-label="Toggle Navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <div className="collapse navbar-collapse bg-dark" id="navbarsExample07">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">
                            About
                        </NavLink>
                    </li>
                </ul>
                {props.isAuth ? (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link logout-link" onClick={props.handleLogout}>
                                Logout
                            </span>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ml-auto">
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
