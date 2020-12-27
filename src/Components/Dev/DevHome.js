import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../../keys';

class DevHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: []
        };
    }

    async componentDidMount() {
<<<<<<< HEAD
        await axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard`)
            .then((response) => {
                const data = response.data.tickets;
                this.setState({ bugs: data });
                console.log('Data was recived');
                console.log(data);
=======
        await axios.get(`http://localhost:8000/api/dashboard`)
        .then((response) => {
            const data = response.data.tickets;
            this.setState({ bugs: data });
            console.log('Data was recived');
            console.log(data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    displaybugs = () => {
        return (
            this.state.bugs.map((bug, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <li>{bug.title}</li>
                            <li>{bug.product}</li>
                            <li>{bug.description}</li>
                            <li>{bug.status}</li>
                            <li>{bug.createdAt}</li>
                        </ul>
                    </div>
                )
>>>>>>> 3749f208ce1e8a5a8b437d60f08e59cd8d1d800f
            })
            .catch((e) => {
                console.log(e);
            });
    }

    displaybugs = () => {
        return this.state.bugs.map((bug, index) => {
            return (
                <div key={`ticket ${index}`}>
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
        return (
            <div>
                <Link className="btn btn-primary" to="/profile">
                    Account Information
                </Link>
                {this.displaybugs()}
            </div>
        );
    }
}

export default DevHome;
