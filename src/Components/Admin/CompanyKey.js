import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../../keys';

class CompanyKey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            show: false,
            key: '',
            loading: false
        };
    }

    componentDidMount() {
        //get company key
        this.setState({ loading: true });
        axios.get(`${REACT_APP_SERVER_URL}/api/company`).then((response) => {
            this.setState({ key: response.data.key, loading: false });
        });
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        const key = (
            <div className="changeInfo">
                <Button variant="outline-primary" onClick={this.handleShow}>
                    View Company Key
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Company Key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.loading ? <p>Loading...</p> : <p>{this.state.key}</p>}</Modal.Body>
                </Modal>
            </div>
        );

        return <div className="CompanyKey">{key}</div>;
    }
}

export default CompanyKey;
