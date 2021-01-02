import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
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
                console.log(data);
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
    
    render() {
        const pageDisplay = () => {
            return (
                <div>
                    {this.state.bugs.map((bug, index) => {
                        return (
                            <div key={index}>
                                <Link style={{color: 'black'}} to={{pathname: `/bugdetails/${bug._id}`, state: bug}} >
                                    {bug.title}
                                </Link>
                            </div>
                        )
                    })}
                    <Link className="btn btn-primary" to="/profile">
                        Account Information
                    </Link>
                </div>
            );
        };

        return (
            <div>
                {pageDisplay()}
                {this.state.redirect ? <Redirect to="/" /> : null}
            </div>
        );
    }
}

export default UserHome;
