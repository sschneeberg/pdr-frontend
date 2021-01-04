import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Chat from '../Chat/ChatBubble';
import { ResponsiveEmbed } from 'react-bootstrap';


class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: [],
            loading: false,
            error: false,
            redirect: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/dashboard/admin-dashboard`)
            .then((response) => {
                if(response.data.msg) {
                    this.setState({error: true, loading: false, redirect: true})
                } else {
                    const data = response.data;
                    this.setState({ bugs: data.tickets, devs: data.users, loading: false });
                }
                
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
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }
        return (
            <div>
                <Link className="btn btn-primary" to={{ pathname: '/profile', state: { users: this.state.devs } }}>
                    Account Information
                </Link>
                {this.state.error ? 
                            <p>
                                An error occurred, please reload the page to try again. Contact us if the problem
                                persists.
                            </p> : null }
                        
                {this.state.loading ? <p>Loading...</p> : null}
                <div className="Project-details">Description of project:</div>
                <div className="New-bugs">
                    Description of bug: Date/time submitted: Website: Select status: Image of bug: button to assign bug
                    to dev:
                </div>
                <div className="devs">
                    Dev names: Severity for each bug they have been assigned: How many bugs the dev is already assigned:
                </div>
                <div id="account-info">
                    <Link className="btn btn-primary" to="/devhome">
                        Developer Dashboard
                    </Link>
                </div>
                <Chat user={this.props.user} socket={this.props.socket} setSocket={this.props.setSocket} />
            </div>
        );
    }
}

export default AdminHome;
