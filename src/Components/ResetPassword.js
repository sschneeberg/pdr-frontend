import React, { Component } from 'react';
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
            error: false,
            show: false,
            loading: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //submit info to backend

        //check passwords match
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: 'Passwords do not match' });
            return;
        } else if (this.state.password.length < 8) {
            this.setState({ error: 'Password must be at least 8 characters' });
            return;
        }
        this.setState({loading: true})
        axios
            .post(`${REACT_APP_SERVER_URL}/api/users/reset`, {
                email: this.state.email,
                password: this.state.password
            })
            .then((response) => {
                //check for error
                if (typeof response.data.msg === 'string' && response.data.msg.includes('Reset')) {
                    this.setState({ error: false, loading: false });
                } else {
                    this.setState({ error: true, loading: false });
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
            show: false
        });
        if (this.state.error.toString().includes('Password')) {
            this.setState({ error: false });
        }
    };

    handleShow = () => this.setState({ show: true });

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const resetPassword = (
            <>
                <div>
                {this.state.loading ? <p>Loading...</p> : null}
                    {this.state.error === true ? (
                        <p style={{ color: 'red' }}>
                            Account not found, cannot reset password. If you believe this to be in error, please contact
                            us.
                        </p>
                    ) : null}
                </div>
                <div className="resetPassword">
                    <Button variant="outline-primary" onClick={this.handleShow}>
                        Reset Password
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Reset Password</Modal.Title>
                        </Modal.Header>

                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <Modal.Body>
                                <FormField
                                    type="email"
                                    label="email"
                                    display="Account Email: "
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <FormField
                                    type="password"
                                    label="password"
                                    display="New Password: "
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
                                {this.state.error.toString().includes('Password') ? (
                                    <p style={{ color: 'red' }}>{this.state.error}</p>
                                ) : null}
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

        return <div>{resetPassword}</div>;
    }
}
export default Profile;
