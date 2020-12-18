import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import Welcome from './Components/Welcome';
import About from './Components/About';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import SignUp from './Components/Signup';
import Login from './Components/Login';
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

    useEffect(() => {
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

    console.log(currentUser);

    return (
        <div className="App">
            <Nav handleLogout={handleLogout} isAuth={isAuthenticated} />
            <div className="container mt-5">
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <PrivateRoute path="/profile" component={Profile} user={currentUser} />
                    <Route path="/about" component={About} />
                    <Route path="/signup" component={SignUp} />
                    <Route
                        path="/login"
                        render={(props) => {
                            return <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} />;
                        }}
                    />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
