import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utilities/setAuthToken';
import FormField from './FormField';
import ResetPassword from './ResetPassword';
import REACT_APP_SERVER_URL from '../keys';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            loading: false
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const userData = { email: this.state.email, password: this.state.password };
        if (this.state.email.length > 0) {
            this.setState({loading: true})
            axios.post(`${REACT_APP_SERVER_URL}/api/users/login`, userData).then((response) => {
                if (response.data.msg) {
                    this.setState({ email: '', password: '', error: true, loading: false });
                } else {
                    const { token } = response.data;
                    this.setState({loading: false})
                    //set token, headers, and current user
                    localStorage.setItem('jwtToken', token);
                    setAuthToken(token);
                    const decoded = jwt_decode(token);
                    this.props.nowCurrentUser(decoded);
                }
            });
        }
    };

    render() {
        if (this.props.user) {
            return <Redirect to="/home" />;
        }

        return (
            <div className="row mt-4">
                {this.state.loading ? <p>Loading...</p> : null}
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body">
                        <h2>Login</h2>
                        <form
                            onSubmit={(e) => {
                                this.handleSubmit(e);
                            }}>
                            <div className="form-group">
                                {this.state.error ? (
                                    <p style={{ color: 'red' }}>Username or Password incorrect, please try again.</p>
                                ) : null}
                                <FormField
                                    type="email"
                                    label="email"
                                    display="Email: "
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />

                                <FormField
                                    type="password"
                                    label="password"
                                    display="Password: "
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />

                                <div style={{ display: 'inline' }}>
                                    <p>Forgot password?</p>
                                    <ResetPassword />
                                </div>

                                <input type="submit" className="btn btn-primary float-right" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
