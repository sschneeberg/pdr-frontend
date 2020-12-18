import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FormField from './FormField';
import REACT_APP_SERVER_URL from '../keys';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            const newUser = { username: this.state.username, email: this.state.email, password: this.state.password };
            axios
                .post(`${REACT_APP_SERVER_URL}/api/users/register`, newUser)
                .then((response) => {
                    console.log(response);
                    this.setState({ redirect: true });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        //else: add logic to handle passwords do not match, password too short, etc
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="row mt-4">
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body">
                        <h2>Sign Up</h2>
                        <form
                            onSubmit={(e) => {
                                this.handleSubmit(e);
                            }}>
                            <div className="form-group">
                                <FormField type="text" label="username" display="Username: " value={this.state.username} onChange={this.onChange} />

                                <FormField type="email" label="email" display="Email: " value={this.state.email} onChange={this.onChange} />

                                <FormField type="password" label="password" display="Password: " value={this.state.password} onChange={this.onChange} />

                                <FormField type="password" label="confirmPassword" display="Confirm Password: " value={this.state.confirmPassword} onChange={this.onChange} />

                                <input type="submit" className="btn btn-primary float-right" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
