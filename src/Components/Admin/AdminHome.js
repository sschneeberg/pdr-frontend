import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../../keys';
import Chat from '../Chat/ChatBubble';
import TicketFilter from './TicketFilter'

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: [],
            devs: [],
            products: [],
            key: '',
            loading: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard/admin-dashboard`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                this.setState({ bugs: data.tickets, devs: data.users, key: data.company.companyKey, products: data.company.products, loading: false });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    assignDev = (id) => {
        axios.put(`${REACT_APP_SERVER_URL}/api/tickets/${id}`).catch((e) => {
            console.log(e);
        });
    }

    getDevOptions = () => {
        return this.state.devs.map((dev, index) => {
            return (
                    <option value={dev._id} key={index}>
                        {dev.username}
                    </option>
            )
        })
    }
    

    displaybugs = () => {
        return (
            this.state.bugs.map((bug, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <li>{bug.title}</li>
                            <li>{bug.company}</li>
                            <li>{bug.product}</li>
                            <li>{bug.description}</li>
                            <li>{bug.status}</li>
                            <li>{bug.createdAt}</li>
                            <div>
                                <select id="dev" onChange={this.assignDev()}>
                                    <option>Assign Dev To Ticket</option>
                                    {this.getDevOptions()}
                                </select>
                            </div>
                        </ul>
                    </div>
                )
            })
        )
    }

    displaydevs = () => {
        return (
            this.state.devs.map((dev, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <li>{dev.username}</li>
                            <li>{dev.permissions}</li>
                            Number Of Bugs Assigned:
                        </ul>
                    </div>
                )
            })
        )
    }

    displayProducts = () => {
        return (
            this.state.products.map((product, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <li>{product}</li>
                        </ul>
                    </div>
                )
            })
        )
    }

    render() {
        // let devOptions = this.state.devs.map((dev, index) => {
        //     return (
        //         <option value={dev._id} key={index}>
        //             {dev.username}
        //         </option>
        //     )
        // })
        // console.log('DEVS', this.state.devs.id);
        return (
            <div>
                <Link className="btn btn-primary" to={{ pathname: '/profile', state: { users: this.state.devs } }}>
                    Account Information
                </Link>
                {this.state.loading ? <p>Loading...</p> : null}
                <div className="Project-details">
                    Company Key: {this.state.key}
                <br></br>
                    Products: {this.displayProducts()}
                </div>
                <div className="New-bugs">
                    <TicketFilter bugs={this.state.bugs} />
                    Tickets: {this.displaybugs()}
                    {/* <select value={this.state.devs} id="dev" onChange={this.assignDev()}>
                        <option>Assign Dev To Ticket</option>

                    </select> */}
                </div>
                <div className="devs">
                    Devs: {this.displaydevs()}
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
