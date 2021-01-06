import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class CompanyKey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            show: false,
            key: '',
            loading: false,
            error: false,
            redirect: false
        };
    }

    componentDidMount() {
        // get company key
        this.setState({ loading: true });
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/company`).then((response) => {
            if (response.data.msg) {
                this.setState({ error: true, loading: false, redirect: true });
            } else {
                this.setState({ key: response.data.key, loading: false, error: false });
            }
        });
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }
        const key = (
            <div className="key">
                <Button variant="outline-primary" onClick={this.handleShow}>
                    View Company Key
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Company Key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error ? (
                            <p>
                                An error occurred, please reload the page to try again. Contact us if the problem
                                persists.
                            </p>
                        ) : this.state.loading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{this.state.key}</p>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        );

        return <div className="CompanyKey">{key}</div>;
    }
}

export default CompanyKey;
