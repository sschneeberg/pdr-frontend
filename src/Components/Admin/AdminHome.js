import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Chat from '../Chat/ChatBubble';

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

    displaybugs = () => {
        return this.state.bugs.map((bug, index) => {
            return (
                <div key={index} className='bug-list-container'>
                        <Link
                            to={{
                                pathname: `/bugdetails/${bug._id}`,
                                state: bug
                            }}>
                            <p className='bug-p'>Title: {bug.title}</p>
                            <p className='bug-p'>Product: {bug.product}</p>
                            <p className='bug-p'>Status: {bug.status}</p>
                            <p className='bug-p'>Assigned To: {bug.assignedTo}</p>
                            <p className='bug-p'>Priority: {bug.priority}</p>
                        </Link>
                            <form
                                action=""
                                onSubmit={(e) => this.assignDevAndUpdatePriority(e, bug._id)}
                                className="bug-p">
                                <select name="assignedTo" id="dev" required={true} onChange={this.onChangeDev}>
                                    <option>Assign Dev To Ticket</option>
                                    {this.getDevOptions()}
                                </select>
                                <select name="priority" id="ticket" required={true} onChange={this.onChangePriority}>
                                    <option>Set Priority</option>
                                    <option value="1">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                    <option value="4">Critical</option>
                                </select>
                                <input type="submit" />
                            </form>
                </div>
            );
        });
    };

    displaydevs = () => {
        return this.state.devs.map((dev, index) => {
            return (
                <div key={index}>
                    <ul>
                        <li className="devs">{dev.username}</li>
                        <li className="devs">{dev.permissions}</li>
                    </ul>
                </div>
            );
        });
    };

    displayProducts = () => {
        return this.state.products.map((product, index) => {
            return (
                <div key={index} id='products-map'>
                    {product}
                </div>
            );
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }
        return (
            <div>
                <Link className="btn btn-primary" id="account-info" to={{ pathname: '/profile', state: { users: this.state.devs } }}>
                    Account Information
                </Link>
                {this.state.error ? (
                    <p>An error occurred, please reload the page to try again. Contact us if the problem persists.</p>
                ) : null}

                {this.state.loading ? <p>Loading...</p> : null}
                <div className="products">
                    <div>
                        Products: {this.displayProducts()}
                    </div>
                </div>
                <div>
                    Devs:
                    <div>
                        {this.displaydevs()}
                    </div>
                </div>
                <div id='bug-container'>
                    Tickets
                    <div className="bugs">
                       {this.displaybugs()}
                    </div>
                </div>
                <div id="dev-dashboard">
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
