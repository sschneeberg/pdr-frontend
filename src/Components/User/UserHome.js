import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Chat from '../Chat/Chat';
import REACT_APP_SERVER_URL from '../../keys';

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: [],
            user: this.props.user,
            loading: true,
            redirect: false
        };
    }

    componentDidMount() {
        axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard`)
            .then((response) => {
                const data = response.data.tickets;
                this.setState({ bugs: data, loading: false });
                console.log('Data was recived');
            })
            .catch((err) => {
                if (err.toString().includes('401')) {
                    this.setState({ redirect: true });
                    this.props.handleLogout();
                }
                console.log(err);
            });
    }

    displaybugs = () => {
        return this.state.bugs.map((bug, index) => {
            return (
                <div key={index}>
                    <ul>
                        <li>{bug.title}</li>
                        <li>{bug.company}</li>
                        <li>{bug.product}</li>
                        <li>{bug.description}</li>
                        <li>{bug.status}</li>
                        <li>{bug.createdAt}</li>
                    </ul>
                </div>
            );
        });
    };

    render() {
        const pageDisplay = () => {
            return (
                <div>
                    <Link className="btn btn-primary" to="/profile">
                        Account Information
                    </Link>
                    {this.displaybugs()}
                </div>
            );
        };

        console.log('userhome', this.props.user);

        return (
            <div>
                {pageDisplay()}
                {this.state.redirect ? <Redirect to="/" /> : null}
                <Chat user={this.state.user} companies={this.props.companies} socket={this.props.socket} />
            </div>
        );
    }
}

export default UserHome;
