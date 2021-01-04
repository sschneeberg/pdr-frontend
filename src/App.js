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
import SubmitBug2 from './Components/SubmitBug2';
import FormSubmitted from './Components/FormSubmitted';
import DevHome from './Components/Dev/DevHome';
import AdminHome from './Components/Admin/AdminHome';
import UserHome from './Components/User/UserHome';
import Profile from './Components/Profile';
import axios from 'axios';
import BugDetails from './Components/BugDetails';
import REACT_APP_SERVER_URL from './keys';
import ChatPortal from './Components/Chat/ChatPortal';
import Error404 from "./Components/404"
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = localStorage.getItem('jwtToken');
    //prettier-ignore
    return (
        <Route {...rest} render={(props) => {
                return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />;
            }}
        />
    );
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [currentUser, setCurrentUser] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState('');
    const [error, setError] = useState(false)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        axios
            .get(`${REACT_APP_SERVER_URL}/api/tickets/companies`)
            .then((response) => {
                if (response.data.msg) {
                    setError(true)
                    setLoading(false)
                    setRedirect(true)
                } else {
                    setCompany(response.data.companies);
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
    }, []);

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
            socket.disconnect();
            setSocket('');
        }
    };

    const setCurrSocket = (s) => {
        setSocket(s);
    };

    const handleExpiration = () => {
        //check session end
        if (Date(this.state.user.exp * 1000) <= Date.now()) {
            handleLogout();
            alert('Session ended');
        }
    };

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
                    <Route path="/" exact component={SubmitBug} />
                    <Route path="/404" exact component={Error404} />
                    <Route path="/about" exact component={About} />
                    <Route path="/signup"  exact component={SignUp} />
                    <Route path="/signup-a-company"  exact component={SignupACompany} />
                    <Route exact
                        path="/company-signup"
                        render={(props) => {
                            return <CompanySignup {...props} companies={company} />;
                        }}
                    />
                    <Route exact
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
                    <Route exact path="/submitbug2" component={SubmitBug2} />
                    <Route exact path="/formsubmitted" component={FormSubmitted} />
                    <Route exact
                        path="/home"
                        render={() => {
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
                                    />
                                );
                            }
                        }}
                    />

                    <Route exact
                        path="/devhome"
                        render={() => {
                            return <DevHome user={currentUser} socket={socket} setSocket={setCurrSocket} />;
                        }}
                    />

                    <Route exact
                        path="/profile"
                        render={({ location }) => {
                            return <Profile location={location} user={currentUser} handleLogout={handleLogout} />;
                        }}
                    />

                    <Route exact
                        path="/bugdetails/:id"
                        render={({ location, match }) => {
                            return <BugDetails location={location} match={match} />;
                        }}
                    />

                    <Route exact path="/chat" render={() => <ChatPortal socket={socket} user={currentUser} />} />
                    <Route path="*" component={Error404} />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default withRouter(App);
