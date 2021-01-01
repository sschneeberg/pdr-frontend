import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import FormField from './FormField';
import REACT_APP_SERVER_URL from '../keys';

class CompanySignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            companyKey: '',
            company: "",
            permissions: "",
            companies: props.companies,
            redirect: false,
            error: false
        };
    }

    onChange = (e) => {
        
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeSelect = (e) => {
        this.setState({company: e.target.value})
    }

    onChangeRadio = (e) => {
        this.setState({permissions: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            //validate password length here
            const newUser = { username: this.state.username, email: this.state.email, password: this.state.password, company: this.state.company, companyKey: this.state.companyKey, permissions: this.state.permissions};
            axios
                .post(`${REACT_APP_SERVER_URL}/api/users/register-company`, newUser)
                .then((response) => {
                    console.log(response);
                    if (response.data.msg) {
                        this.setState({ error: true });
                    } else {
                        this.setState({ redirect: true });
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
         let companyInfo = this.state.companies.map((c, i) => {
            return (<option value={c.name} key={i}>{c.name}</option>)
            })

        return (
            <div className="row mt-4">
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body">
                        <h2>Sign Up with your company</h2>
                        <form
                            onSubmit={(e) => {
                                this.handleSubmit(e);
                            }}>
                                
                            <p>Don't see your company listed?</p>
                            <Link to="/signup-a-company">Signup your company here!</Link>

                            <div className="form-group">
                                {this.state.error === true ? (
                                    <p style={{ color: 'red' }}>Company name already registered</p>
                                ) : null}
                                <FormField type="text" label="username" display="Username: " value={this.state.username} onChange={this.onChange} />

                                <FormField type="email" label="email" display="Email: " value={this.state.email} onChange={this.onChange} />

                                <FormField type="password" label="password" display="Password: " value={this.state.password} onChange={this.onChange} />

                                <FormField type="password" label="confirmPassword" display="Confirm Password: " value={this.state.confirmPassword} onChange={this.onChange} />

                                <div className="form-group">
                                    <label htmlfor="company">Companies: </label>
                                    <select className="form-control" id="company" value={this.state.company} onChange={this.onChangeSelect}>
                                        <option>Select a company</option>
                                    {companyInfo}
                                    </select>
                                </div>

                                <div className="form-check form-check-inline">

                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id='dev' value="dev" onChange={this.onChangeRadio} checked={this.state.permissions === "dev"}/>
                                    <label className="form-check-label" htmlFor="dev">Developer</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id='admin' value="admin" onChange={this.onChangeRadio} checked={this.state.permissions === "admin"}/>
                                    <label className="form-check-label" htmlFor="admin">Admin</label>
                                </div>

                                <FormField type="text" label="companyKey" display="Enter your company key: " value={this.state.companyKey} onChange={this.onChange} />

                                <input type="submit" className="btn btn-primary float-right" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanySignup;
