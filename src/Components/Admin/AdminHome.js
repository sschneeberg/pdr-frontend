import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Chat from '../Chat/ChatBubble';
import './AdminHome.css';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: [],
            loading: false,
            error: false,
            redirect: false,
            devs: [],
            products: [],
            assignedTo: '',
            priority: ''
        };
    }

    getAdminDash = () => {
        this.setState({ loading: true });
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/dashboard/admin-dashboard`)
            .then((response) => {
                if (response.data.msg) {
                    this.setState({ error: true, loading: false, redirect: true });
                } else {
                    const data = response.data;
                    this.setState({
                        bugs: data.tickets,
                        devs: data.users,
                        loading: false,
                        products: data.company.products
                    });
                }
            })
            .catch((e) => {
                this.setState({ error: true, loading: false, redirect: true });
                console.log(e);
            });
    };

    componentDidMount() {
        this.getAdminDash();
    }

    assignDevAndUpdatePriority = (e, id) => {
        e.preventDefault();
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${id}`, {
                assignedTo: this.state.assignedTo,
                priority: this.state.priority
            })
            .then((response) => {
                this.getAdminDash();
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    getDevOptions = () => {
        return this.state.devs.map((dev, index) => {
            return (
                <option value={dev._id} key={index}>
                    {dev.username}
                </option>
            );
        });
    };

    onChangeDev = (e) => {
        this.setState({
            assignedTo: e.target.value
        });
    };

    onChangePriority = (e) => {
        this.setState({
            priority: e.target.value
        });
    };

    makeDate(date) {
        let dateArray = date.toString().split('T')[0].split('-');
        return [dateArray[1], dateArray[2], dateArray[0]];
    }

    displaybugs = () => {
        const priorityMap = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
        const statusMap = { 1: 'Received', 2: 'In Review', 3: 'Closed' };

        const devMap = {};
        this.state.devs.forEach((dev) => (devMap[dev._id] = dev.username));

        const bugLinks = this.state.bugs.map((bug, index) => {
            return (
                <div key={index} className="bug-details-link admin">
                    <Link
                        className="bug-link admin"
                        to={{
                            pathname: `/bugdetails/${bug._id}`,
                            state: bug
                        }}>
                        <h2>
                            {bug.title} <span>{this.makeDate(bug.createdAt).join('/')}</span>
                        </h2>
                        <div class="bug-info-a">
                            <p><strong>Status:</strong> {statusMap[bug.status]}</p>
                            <p><strong>Product:</strong> {bug.product}</p>
                        </div>
                        <div className="bug-info-b">
                            <p><strong>Assigned To:</strong> {devMap[bug.assignedTo] ? devMap[bug.assignedTo] : 'Unassigned'}</p>
                            <p><strong>Priority:</strong> {priorityMap[bug.priority] ? priorityMap[bug.priority] : 'Unassigned'}</p>
                        </div>
                    </Link>
                    <form className="admin" action="" onSubmit={(e) => this.assignDevAndUpdatePriority(e, bug._id)}>
                        <select
                            className="form-control"
                            name="assignedTo"
                            id="dev"
                            required={true}
                            onChange={this.onChangeDev}>
                            <option>Assign Dev To Ticket</option>
                            {this.getDevOptions()}
                        </select>
                        <select
                            className="form-control"
                            name="priority"
                            id="ticket"
                            required={true}
                            onChange={this.onChangePriority}>
                            <option>Set Priority</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                            <option value="4">Critical</option>
                        </select>
                        <input className="form-control" type="submit" id="submit-btn"/>
                    </form>
                </div>
            );
        });

        return bugLinks.reverse();
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }
        return (
            <div>
                <div className="adminNav">
                    <Link
                        className="btn"
                        id="account-info"
                        to={{ pathname: '/profile', state: { users: this.state.devs, products: this.state.products } }}>
                        Account Information
                    </Link>

                    <Link className="btn" to="/devhome" > 
                        Developer Dashboard
                    </Link>
                </div>
                {this.state.error ? (
                    <p>An error occurred, please reload the page to try again. Contact us if the problem persists.</p>
                ) : null}

                {this.state.loading ? <p>Loading...</p> : null}

                <div className="big-div admin" id="bug-container">
                    <h2 style={{fontFamily: "bebas-neue"}}>All Tickets:</h2>
                    {this.displaybugs()}
                </div>

                <Chat user={this.props.user} socket={this.props.socket} setSocket={this.props.setSocket} />
            </div>
        );
    }
}

export default AdminHome;
