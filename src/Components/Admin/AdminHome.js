import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../../keys';
import Chat from '../Chat/ChatBubble';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            projectDescription: '',
            date: '',
            website: '',
            status: '',
            image: '',
            severity: '',
            numOfBugsAssinged: '',
            devs: '',
            bugs: [],
            loading: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard/admin-dashboard`)
            .then((response) => {
                const data = response.data;
                console.log(response.data);
                this.setState({ bugs: data.tickets, devs: data.users, loading: false });
                console.log('Data was recived');
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // displaybugs = () => {
    //     return (
    //         this.state.bugs.map((bug, index) => {
    //             return (
    //                 <div>
    //                     <ul key={index}>
    //                         <li>{bug.title}</li>
    //                         <li>{bug.company}</li>
    //                         <li>{bug.product}</li>
    //                         <li>{bug.description}</li>
    //                         <li>{bug.status}</li>
    //                         <li>{bug.createdAt}</li>
    //                     </ul>
    //                 </div>
    //             )
    //         })
    //     )
    // }

    render() {
        return (
            <div>
                <Link className="btn btn-primary" to={{ pathname: '/profile', state: { users: this.state.devs } }}>
                    Account Information
                </Link>
                {this.state.loading ? <p>Loading...</p> : null}
                <div className="Project-details">Description of project:</div>
                <div className="New-bugs">
                    Description of bug: Date/time submitted: Website: Select status: Image of bug: button to assign bug
                    to dev:
                </div>
                <div className="devs">
                    Dev names: Severity for each bug they have been assigned: How many bugs the dev is already assigned:
                </div>
                <Chat user={this.props.user} socket={this.props.socket} />
            </div>
        );
    }
}

export default AdminHome;
