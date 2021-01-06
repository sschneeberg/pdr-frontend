import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import FormField from './FormField';
import AdminControls from './Admin/AdminControls';
import CompanyKey from './Admin/CompanyKey';
import DeleteCompany from './Admin/DeleteCompany';

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
            loading: false,
            redirect: false
        };
    }

    componentDidMount() {
        if (!this.props.user) {
            this.setState({ redirect: true });
            this.props.handleLogout();
        }
    }

    componentDidUpdate() {
        if (this.state.changed) {
            //pull new user info
            if (!this.state.loading) this.setState({ loading: true });
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${this.state.user.id}`).then((updatedUser) => {
                this.setState({ user: updatedUser.data.user, changed: false, loading: false });
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //submit info to backend
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
        this.setState({ loading: true });
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/users/${this.state.user.id}`, {
                [this.state.changedField]: this.state[this.state.changedField]
            })
            .then((response) => {
                //check for error
                if (typeof response.data.msg === 'string' && response.data.msg.includes('updated')) {
                    this.setState({ error: false, changed: true, loading: false });
                } else if (typeof response.data.msg === 'string' && response.data.msg.includes('in use')) {
                    //cannot have duplicate email
                    this.setState({ error: 'Email in use by another account, please try another.', loading: false });
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
            username: '',
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
        if (e.target.name !== 'confirmPassword') {
            this.setState({ changedField: e.target.name });
        }
    };

    displayDevs = () => {
        const devTitles = { admin: 'Administrator', dev: 'Developer' };
        return this.props.location.state.users.map((dev, index) => {
            return (
                <div key={index}>
                    <ul>
                        <li className="devs">
                            {dev.username}, {devTitles[dev.permissions]}
                        </li>
                    </ul>
                </div>
            );
        });
    };

    render() {
        const userData = (
            <>
                <div className="userInfo">
                    <h1>Account Information</h1>
                    {this.state.loading ? (
                        <p>Loading User Information ... </p>
                    ) : (
                        <>
                            <p>
                                <strong>Username: </strong> {this.state.user.username}
                            </p>
                            <p>
                                <strong>Email: </strong> {this.state.user.email}
                            </p>

                            {this.state.user.company ? (
                                <>
                                    <p>
                                        <strong>Company: </strong> {this.state.user.company}
                                    </p>

                                    {this.state.user.permissions === 'admin' ? (
                                        <>
                                            <strong>Products: </strong>
                                            <p>
                                                {this.props.location.state.products.join(', ')}
                                            </p>
                                            <strong>Users: </strong> 
                                            <p id='users'>
                                                {this.displayDevs()}
                                            </p>
                                        </>
                                    ) : null}
                                </>
                            ) : null}
                            {this.state.user.permissions === 'admin' ? (
                                <div id='buttonz'>
                                    <CompanyKey user={this.state.user} />
                                    <DeleteCompany user={this.state.user} handleLogout={this.props.handleLogout} />
                                    <AdminControls users={this.props.location.state.users} user={this.state.user} />
                                </div>
                            ) : null}
                        </>
                    )}
                    {this.state.error === true ? (
                        <p style={{ color: 'red' }}>
                            An error occurred, please try updating your information again or contact us if the problem
                            persists.
                        </p>
                    ) : null}
                    {this.state.error.toString().includes('Email') ? (
                        <p style={{ color: 'red' }}>{this.state.error}</p>
                    ) : null}
                <div className="changeInfo">
                    <Button variant="primary" id='uai' onClick={this.handleShow}>
                        Update Account Information
                    </Button>
                </div>

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

        return (
            <div>
                {this.state.redirect ? <Redirect to="/" /> : null}
                {userData}
            </div>
        );
    }
}
export default Profile;
