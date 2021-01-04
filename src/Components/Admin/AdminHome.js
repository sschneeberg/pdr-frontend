import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
            assignedTo: '',
            priority: '',
            loading: false
        };
    }

    getAdminDash = () => {
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

    componentDidMount() {
        this.getAdminDash();
    }


    assignDevAndUpdatePriority = (e, id) => {
        e.preventDefault();
        axios.put(`${REACT_APP_SERVER_URL}/api/tickets/${id}`, { assignedTo: this.state.assignedTo, priority: this.state.priority})
        .then((response) => {
            this.getAdminDash();
            console.log(response);
        }).catch((e) => {
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

    onChangeDev = (e) => {
        this.setState({
            assignedTo: e.target.value
        })
    }

    onChangePriority = (e) => {
        this.setState({
            priority: e.target.value
        })
    }
    

    displaybugs = () => {
        return (
            this.state.bugs.map((bug, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <Link to={{
                                pathname: `/bugdetails/${bug._id}`,
                                state: bug
                            }}>
                                <li>Title: {bug.title}</li>
                                <li>Product: {bug.product}</li>
                                <li>Status: {bug.status}</li>
                                <li>Assigned To: {bug.assignedTo}</li>
                                <li>Priority: {bug.priority}</li>
                            </Link>
                            <div>
                                <form action="" onSubmit={(e) => this.assignDevAndUpdatePriority(e, bug._id)} className='form-group'>
                                    <select name='assignedTo' id="dev" required={true} onChange={this.onChangeDev}>
                                        <option>Assign Dev To Ticket</option>
                                        {this.getDevOptions()}
                                    </select>
                                    <select name="priority" id="ticket" required={true} onChange={this.onChangePriority}>
                                        <option>Set Priority</option>
                                        <option value='1'>Low</option>
                                        <option value='2'>Medium</option>
                                        <option value='3'>High</option>
                                        <option value='4'>Critical</option>
                                    </select>
                                    <input type="submit" />
                                </form>
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
                    {/* <TicketFilter bugs={this.state.bugs} />  STRETCH GOAL */}
                    Tickets: {this.displaybugs()}
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
