import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../../keys';

class AdminControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            show: false,
            error: false,
            changed: false
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    handleSubmit(e) {
        e.preventDefault();
        //save user's permissions, send to backend
        axios
            .put(`${REACT_APP_SERVER_URL}/api/users/permissions/${e.target[1].value}`, {
                permissions: e.target[0].value
            })
            .then((response) => {
                //handle errors
                if (typeof response.data.msg === 'string' && response.data.msg.includes('updated')) {
                    this.setState({ error: false, changed: true });
                } else {
                    this.setState({ error: true, changed: false });
                }
            });
    }

    handleDelete(e, id) {
        e.preventDefault();
        axios.delete(`${REACT_APP_SERVER_URL}/api/users/${id}`).then((response) => {
            console.log(response);
            //handle errors
            if (typeof response.data.msg === 'string' && response.data.msg.includes('deleted')) {
                this.setState({ error: false, changed: true });
            } else {
                this.setState({ error: true, changed: false });
            }
        });
    }

    render() {
        const users = this.state.users.map((user, index) => {
            return (
                <div key={`user ${index}`} style={{ display: 'inline' }}>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <p>
                            {user.username}
                            {' ['}
                            {user.permissions.slice(0, 1).toUpperCase() +
                                user.permissions.slice(1, user.permissions.length)}
                            {']'}
                        </p>
                        <label htmlFor="permissions">Change Permissions: </label>
                        <select name="permissions">
                            <option value="admin">Administrator</option>
                            <option value="dev">Developer</option>
                        </select>
                        <input type="hidden" value={user._id} />
                        <Button variant="outline-secondary" size="sm" onClick={(e) => this.handleDelete(e, user._id)}>
                            Remove User
                        </Button>
                        <Button variant="outline-primary" size="sm" type="submit">
                            Save
                        </Button>
                    </form>
                    <hr />
                </div>
            );
        });

        const controlPanel = (
            <div className="changeInfo">
                <Button variant="primary" onClick={this.handleShow}>
                    Company Details
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Company Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error ? (
                            <p style={{ color: 'red' }}>
                                An error occurred, please try updating your changes again or contact us if the problem
                                persists.
                            </p>
                        ) : null}
                        {this.state.changed ? (
                            <p style={{ color: 'green' }}>Updating, changes will be reflected on your dashboard.</p>
                        ) : null}
                        {users}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

        return <div className="AdminControls">{controlPanel}</div>;
    }
}

export default AdminControls;
