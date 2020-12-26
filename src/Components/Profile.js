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
            password: '',
            confirmPassword: '',
            email: '',
            username: '',
            changed: false,
            changedField: '',
            error: false,
            show: false
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
                if (response.msg.includes('updated')) {
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

    handleClose = () => {
        this.setState({
            password: '',
            confirmPassword: '',
            email: '',
            username: '',
            show: false
        });
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
                                {this.state.error.toString().includes('match') ? <p>{this.state.error}</p> : <p></p>}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
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
                {this.props.user ? userData : errorDiv()}
            </div>
        );
    }
}
export default Profile;
