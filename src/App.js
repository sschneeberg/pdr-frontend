import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import About from './Components/About';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import SignUp from './Components/Signup';
import CompanySignup from './Components/CompanySignup';
import SignupACompany from './Components/SignupACompany';
import Login from './Components/Login';
import SubmitBug from './Components/SubmitBug';
import FormSubmitted from './Components/FormSubmitted';
import DevHome from './Components/Dev/DevHome';
import AdminHome from './Components/Admin/AdminHome';
import UserHome from './Components/User/UserHome';
import Profile from './Components/Profile';
import axios from 'axios';
import BugDetails from './Components/BugDetails';
import ChatPortal from './Components/Chat/ChatPortal';
import Error404 from './Components/404';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [currentUser, setCurrentUser] = useState('');
    const [company, setCompany] = useState('');
    const [products, setProduct] = useState('');
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState('');
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log(process.env);
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/tickets/companies`)
            .then((response) => {
                if (response.data.msg) {
                    setError(true);
                    setLoading(false);
                    setRedirect(true);
                } else {
                    setCompany(response.data.companies);
                    setProduct(response.data.company_products);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        let token;
        //if no token in local storage, then user is not authenticated
        if (!localStorage.getItem('jwtToken')) {
            setIsAuthenticated(false);
        } else {
            token = jwt_decode(localStorage.getItem('jwtToken'));
            setAuthToken(localStorage.jwtToken);
            setCurrentUser(token);
        }

        window.addEventListener('beforeunload', handleLeavePage);

        return function cleanup() {
            window.removeEventListener('beforeunload', handleLeavePage);
        };
    }, []);

    useEffect(() => {
        console.log('use effect');
        handleExpiration();
    });

    const handleLeavePage = (e) => {
        handleLogout();
        const confirmationMessage = 'Session will end when you leave the site';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    };

    const nowCurrentUser = (userData) => {
        setCurrentUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        if (localStorage.getItem('jwtToken')) {
            //remove token on logout
            localStorage.removeItem('jwtToken');
            setCurrentUser('');
            setIsAuthenticated(false);
            if (socket) socket.disconnect();
            setSocket('');
        }
    };

    const setCurrSocket = (s) => {
        setSocket(s);
    };

    const handleExpiration = () => {
        console.log(currentUser.exp * 1000 - Date.now());
        //check session end
        if (currentUser.exp * 1000 - Date.now() < 0) {
            console.log('logout');
            handleLogout();
            alert('Session ended, please log in again');
        }
    };

    console.log(process.env);

    if (loading) {
        return <div>Loading....</div>;
    }

    if (redirect) {
        return <Redirect to="/404" />;
    }

    return (
        <div className="App">
            <Nav handleLogout={handleLogout} isAuth={isAuthenticated} user={currentUser} socket={socket} />
            <div className="container mt-5">
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => {
                            return (
                                <SubmitBug
                                    {...props}
                                    companies={company}
                                    products={products}
                                    user={currentUser}
                                    nowCurrentUser={nowCurrentUser}
                                    setIsAuthenticated={setIsAuthenticated}
                                />
                            );
                        }}
                    />
                    <Route path="/404" exact component={Error404} />
                    <Route path="/about" component={About} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/signup-a-company" component={SignupACompany} />
                    <Route
                        path="/company-signup"
                        render={(props) => {
                            return <CompanySignup {...props} companies={company} />;
                        }}
                    />
                    <Route
                        exact
                        path="/login"
                        render={(props) => {
                            return (
                                <Login
                                    {...props}
                                    nowCurrentUser={nowCurrentUser}
                                    setIsAuthenticated={setIsAuthenticated}
                                    user={currentUser}
                                />
                            );
                        }}
                    />
                    <Route exact path="/formsubmitted" component={FormSubmitted} />
                    <Route
                        exact
                        path="/home"
                        render={({ location }) => {
                            if (currentUser.permissions === 'admin') {
                                return <AdminHome user={currentUser} socket={socket} setSocket={setCurrSocket} />;
                            } else if (currentUser.permissions === 'dev') {
                                return <DevHome user={currentUser} socket={socket} setSocket={setCurrSocket} />;
                            } else if (currentUser.permissions !== 'dev' && currentUser.permissions !== 'admin') {
                                return (
                                    <UserHome
                                        handleLogout={handleLogout}
                                        user={currentUser}
                                        companies={company}
                                        socket={socket}
                                        setSocket={setSocket}
                                        location={location}
                                    />
                                );
                            }
                        }}
                    />

                    <Route
                        exact
                        path="/devhome"
                        render={() => {
                            return <DevHome user={currentUser} socket={socket} setSocket={setCurrSocket} />;
                        }}
                    />

                    <Route
                        exact
                        path="/profile"
                        render={({ location }) => {
                            return <Profile location={location} user={currentUser} handleLogout={handleLogout} />;
                        }}
                    />

                    <Route
                        exact
                        path="/bugdetails/:id"
                        render={({ location, match }) => {
                            return (
                                <BugDetails
                                    location={location}
                                    match={match}
                                    user={currentUser}
                                    handleLogout={handleLogout}
                                />
                            );
                        }}
                    />

                    <Route exact path="/chat" render={() => <ChatPortal socket={socket} user={currentUser} />} />
                    <Route path="*" component={Error404} />
                </Switch>
            </div>
        </div>
    );
}

export default withRouter(App);
