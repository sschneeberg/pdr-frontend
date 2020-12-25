import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FormField from './FormField';
import REACT_APP_SERVER_URL from '../keys';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            email: '',
            username: '',
            changed: false,
            changedField: '',
            error: false
        };
    }

    componentDidUpdate() {
        if (this.changed) {
            //pull new user info
            return;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //submit info to backend
        if (this.state.changedField === 'password') {
            //check passwords match
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({ error: 'Password do not match' });
            }
        }
        axios
            .put(`${REACT_APP_SERVER_URL}/api/users/${this.props.user.id}`, {
                //can this be a variable to make this one function?
                [this.state.changedField]: this.state.changedField
            })
            .then((response) => {
                //check for error
                if (response.msg.inludes('updated')) {
                    this.setState({ error: false });
                } else {
                    this.setState({ error: true });
                }
            });

        //reset form fields to blank
        this.setState({
            password: '',
            confirmPassword: '',
            email: '',
            username: ''
        });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name !== 'confirmPassword') {
            this.setState({ changedField: e.target.name });
        }
    };

    render() {
        const userData = (
            <>
                <div className="userInfo">
                    <h1>Account Information</h1>
                    <p>
                        <strong>Username:</strong> {this.props.user.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {this.props.user.email}
                    </p>
                    {this.state.error === true ? (
                        <p>
                            An error occurred, please try updating your information again or contact us if the problem
                            persists.
                        </p>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="changeInfo">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Update Account Information
                    </button>

                    <div className="modal" tabindex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Update Account Information</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                    <div className="modal-body">
                                        <FormField
                                            type="text"
                                            label="username"
                                            display="Change Username: "
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />
                                        <hr />
                                        <FormField
                                            type="text"
                                            label="email"
                                            display="Change Email: "
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />
                                        <hr />
                                        <FormField
                                            type="text"
                                            label="password"
                                            display="Change Password: "
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />
                                        <FormField
                                            type="text"
                                            label="confirmPassword"
                                            display="Confirm New Password: "
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />
                                        {this.state.error.inludes('match') ? <p>{this.state.error}</p> : <p></p>}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.setState({
                                                    password: '',
                                                    confirmPassword: '',
                                                    email: '',
                                                    username: ''
                                                })
                                            }
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

        const errorDiv = () => {
            return (
                <div className="text-center pt-4">
                    <h3>
                        Please <Link to="/login">login</Link> to view this page
                    </h3>
                </div>
            );
        };

        return <div>{this.props.user ? userData : errorDiv()}</div>;
    }
}
export default Profile;
