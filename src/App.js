import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
import axios from 'axios';
import BugDetails from './Components/BugDetails';

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
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/tickets/companies`)
            .then((response) => {
                setCompany(response.data.companies);
                setLoading(false);
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
        console.log('nowCurrentUser is here...');
        setCurrentUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        if (localStorage.getItem('jwtToken')) {
            //remove token on logout
            localStorage.removeItem('jwtToken');
            setCurrentUser('');
            setIsAuthenticated(false);
        }
    };
    if (loading) {
        return <div>Loading....</div>;
    }
    return (
        <div className="App">
            <Nav handleLogout={handleLogout} isAuth={isAuthenticated} />
            <div className="container mt-5">
                <Switch>
                    <Route path="/" exact component={SubmitBug} />
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
                    <Route path="/sbpt2" component={SubmitBug2} />
                    <Route path="/formsubmitted" component={FormSubmitted} />
                    <Route
                        path="/home"
                        render={() => {
                            if (currentUser.permissions === 'admin') {
                                return <AdminHome />;
                            } else if (currentUser.permissions === 'dev') {
                                return <DevHome />;
                            } else {
                                return <UserHome />;
                            }
                        }}
                    />
                    <Route path="/bugdetails" component={BugDetails} />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
