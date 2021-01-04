import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DeleteCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            show: false,
            loading: false,
            error: false,
            deleted: false,
            confirm: '',
            match: true
        };
    }

    handleDelete() {
        //check match
        if (this.state.confirm === this.state.user.company) {
            this.setState({ loading: true });
            axios.delete(`${REACT_APP_SERVER_URL}/api/company`).then((response) => {
                if (typeof response.data.msg === 'string' && response.data.msg.includes('deleted')) {
                    this.setState({ error: false, loading: false, deleted: true });
                } else {
                    this.setState({ loading: false, error: true });
                }
            });
        } else {
            this.setState({ match: false });
        }
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        const confirmDelete = () => (
            <div>
                <p>
                    This will delete your company and every user account from our records. Please type{' '}
                    <strong>{this.state.user.company}</strong> to confirm.
                </p>
                <input
                    type="text"
                    value={this.state.confirm}
                    onChange={(e) => {
                        this.setState({ confirm: e.target.value });
                    }}
                />
                {!this.state.match ? <p>Company name must match in order to delete</p> : null}
                <Button
                    variant="outline-danger"
                    block
                    onClick={() => {
                        this.handleDelete();
                    }}>
                    Delete All Company Data
                </Button>
            </div>
        );

        const deletedMsg = () => (
            <div>
                <p>Company records deleted. Please logout immediately. Thank you for using PDR.</p>
                <Link to="/" onClick={this.props.handleLogout}>
                    <Button variant="outline-danger" block>
                        Logout
                    </Button>
                </Link>
            </div>
        );

        const deleteCo = () => (
            <div className="delete">
                <Button variant="danger" onClick={this.handleShow}>
                    Delete Company
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error ? (
                            <p>
                                An error occurred, please reload the page to try again. Contact us if the problem
                                persists.
                            </p>
                        ) : this.state.loading ? (
                            <p>Working...</p>
                        ) : this.state.deleted ? (
                            deletedMsg()
                        ) : (
                            confirmDelete()
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        );

        return <div className="DeleteCompany">{deleteCo()}</div>;
    }
}

export default DeleteCompany;
