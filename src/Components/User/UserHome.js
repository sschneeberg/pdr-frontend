import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import REACT_APP_SERVER_URL from '../../keys';

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: []
        };
    }

    async componentDidMount() {
        await axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard`)
            .then((response) => {
                const data = response.data.tickets;
                this.setState({ bugs: data });
                console.log('Data was recived');
            })
            .catch((e) => {
                console.log(e);
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
        const errorDiv = () => {
            return (
                <div className="text-center pt-4">
                    <h3>
                        Please <Link to="/login">login</Link> to view this page
                    </h3>
                </div>
            );
        };

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

        return <div>{this.state.bugs.length > 0 ? pageDisplay() : errorDiv()}</div>;
    }
}

export default UserHome;
