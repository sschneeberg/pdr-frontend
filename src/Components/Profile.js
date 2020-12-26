import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import FormField from './FormField';
import REACT_APP_SERVER_URL from '../keys';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            password: '',
            confirmPassword: '',
            email: '',
            username: '',
            changed: false,
            changedField: '',
            error: false,
            show: false,
            loading: false
        };
    }

    componentDidCatch() {
        //from Bootstrap Docs
        var myModal = document.getElementById('myModal');
        var myInput = document.getElementById('myInput');

        myModal.addEventListener('shown.bs.modal', function () {
            myInput.focus();
        });
    }

    componentDidUpdate() {
        if (this.state.changed) {
            //pull new user info
            if (!this.state.loading) this.setState({ loading: true });
            axios.get(`${REACT_APP_SERVER_URL}/api/users/${this.state.user.id}`).then((updatedUser) => {
                this.setState({ user: updatedUser.data.user, changed: false, loading: false });
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //submit info to backend
        console.log('submit');
        if (this.state.changedField === 'password') {
            //check passwords match
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({ error: 'Passwords do not match' });
                return;
            } else if (this.state.password.length < 8) {
                this.setState({ error: 'Password must be at least 8 characters' });
                return;
            }
        }
        axios
            .put(`${REACT_APP_SERVER_URL}/api/users/${this.state.user.id}`, {
                //can this be a variable to make this one function?
                [this.state.changedField]: this.state[this.state.changedField]
            })
            .then((response) => {
                //check for error
                console.log(response.data);
                if (typeof response.data.msg === 'string' && response.data.msg.includes('updated')) {
                    this.setState({ error: false, changed: true });
                } else if (typeof response.data.msg === 'string' && response.data.msg.includes('in use')) {
                    //cannot have duplicate email
                    this.setState({ error: 'Email in use by another account, please try another.' });
                } else {
                    this.setState({ error: true });
                }
                this.handleClose();
            });

        //reset form fields to blank
        this.setState({
            password: '',
            confirmPassword: '',
            email: '',
            username: ''
        });
    };

    handleClose = () => {
        this.setState({
            password: '',
            confirmPassword: '',
            email: '',
            username: '',
            show: false
        });
        if (this.state.error.toString().includes('match')) {
            this.setState({ error: false });
        }
    };

    handleShow = () => this.setState({ show: true });

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name !== 'confirmPassword') {
            this.setState({ changedField: e.target.name });
        }
    };

    render() {
        console.log(this.state.user);
        const userData = (
            <>
                <div className="userInfo">
                    <h1>Account Information</h1>
                    {this.state.loading ? (
                        <p>Loading User Information ... </p>
                    ) : (
                        <>
                            <p>
                                <strong>Username:</strong> {this.state.user.username}
                            </p>
                            <p>
                                <strong>Email:</strong> {this.state.user.email}
                            </p>

                            {this.state.user.company ? (
                                <p>
                                    <strong>Company:</strong> {this.state.user.company}
                                </p>
                            ) : (
                                <p></p>
                            )}
                        </>
                    )}
                    {this.state.error === true ? (
                        <p style={{ color: 'red' }}>
                            An error occurred, please try updating your information again or contact us if the problem
                            persists.
                        </p>
                    ) : (
                        <p></p>
                    )}
                    {this.state.error.toString().includes('Email') ? (
                        <p style={{ color: 'red' }}>{this.state.error}</p>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="changeInfo">
                    <Button variant="primary" onClick={this.handleShow}>
                        Update Account Information
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Account information</Modal.Title>
                        </Modal.Header>

                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <Modal.Body>
                                <FormField
                                    type="text"
                                    label="username"
                                    display="Change Username: "
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                                <hr />
                                <FormField
                                    type="email"
                                    label="email"
                                    display="Change Email: "
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <hr />
                                <FormField
                                    type="password"
                                    label="password"
                                    display="Change Password: "
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <FormField
                                    type="password"
                                    label="confirmPassword"
                                    display="Confirm New Password: "
                                    value={this.state.confirmPassword}
                                    onChange={this.onChange}
                                />
                                {this.state.error.toString().includes('Password') ? (
                                    <p style={{ color: 'red' }}>{this.state.error}</p>
                                ) : (
                                    <p></p>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="secondary">
                                    Save
                                </Button>
                                <Button variant="primary" onClick={this.handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
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

        return (
            <div>
                <p>Profile page</p>
                {this.state.user ? userData : errorDiv()}
            </div>
        );
    }
}
export default Profile;
