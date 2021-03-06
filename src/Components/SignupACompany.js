import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FormField from './FormField';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import {signupCompanyHelp} from './User/HelpText'

class SignupACompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            products: '',
            company: '',
            redirect: false,
            error: false,
            loading: false,
            errorMsg: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            //validate password length here
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                company: this.state.company,
                products: this.state.products,
                permissions: 'admin'
            };
            this.setState({ loading: true });
            axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/users/register-company`, newUser)
                .then((response) => {
                    if (response.data.msg) {
                        this.setState({ error: true, loading: false, errorMsg: response.data.msg });
                    } else {
                        this.setState({ redirect: true, loading: false });
                    }
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
            <>
            <div className="float-right" style={{ display: 'flex' }}>
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={
                            <Popover>
                                <Popover.Title as="h3">Signup Help</Popover.Title>
                                <Popover.Content>{signupCompanyHelp}</Popover.Content>
                            </Popover>
                        }>
                        <Button variant="outline-secondary" style={{ borderRadius: '60%'}}>
                            ?
                        </Button>
                    </OverlayTrigger>
                </div>
            <div className="row mt-4">
                {this.state.loading ? <p>Loading...</p> : null}
                
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body">
                        <h2>Sign Up your company with us</h2>
                        <form
                            onSubmit={(e) => {
                                this.handleSubmit(e);
                            }}>
                            <div className="form-group">
                                {this.state.error ? <p style={{ color: 'red' }}>{this.state.errorMsg}</p> : null}
                                <FormField
                                    type="text"
                                    label="username"
                                    display="Username: "
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />

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

                                <FormField
                                    type="password"
                                    label="confirmPassword"
                                    display="Confirm Password: "
                                    value={this.state.confirmPassword}
                                    onChange={this.onChange}
                                />

                                <FormField
                                    type="text"
                                    label="company"
                                    display="Company name: "
                                    value={this.state.company}
                                    onChange={this.onChange}
                                />

                                <FormField
                                    type="text"
                                    label="products"
                                    display="Enter your company products: "
                                    value={this.state.products}
                                    onChange={this.onChange}
                                />

                                <p>**Separate all products by commas**</p>
                                <input type="submit" className="btn btn-primary float-right" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default SignupACompany;
