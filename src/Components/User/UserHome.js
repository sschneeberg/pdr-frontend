import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Chat from '../Chat/ChatBubble';
import REACT_APP_SERVER_URL from '../../keys';
import io from 'socket.io-client';

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: [],
            user: this.props.user,
            loading: true,
            redirect: false,
            socket: null,
            notification: false,
            title: null,
            ticketUser: null
        };
    }

    componentDidMount() {
        axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard`)
            .then((response) => {
                const data = response.data.tickets;
                console.log(data);
                this.setState({ bugs: data, loading: false });
            })
            .catch((err) => {
                if (err.toString().includes('401')) {
                    this.setState({ redirect: true });
                    this.props.handleLogout();
                }
                console.log(err);
            });
    }

    resetNote = () => {
        return this.setState({ notification: false, title: null, ticketUser: null });
    };

    setNotifications = (updated) => {
        if (updated.ticket.user === this.state.user.id) {
            this.setState({ notification: true, title: updated.ticket.title, ticketUser: updated.ticket.user });
        } else {
            return;
        }
        console.log('UPDATED', updated);
    };

    render() {
        const pageDisplay = () => {
            if (this.state.notification) {
                return (
                    <div>
                        <div
                            aria-live="polite"
                            aria-atomic="true"
                            style={{
                                position: 'relative',
                                minHeight: '100px',
                                minWidth: '100px',
                                border: 'solid 2px black'
                            }}>
                            <div className="toast" style={{ position: 'absolute', top: 0, right: 0 }}>
                                <div className="toast-header">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-bug"
                                        viewBox="0 0 16 16">
                                        <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z" />
                                    </svg>
                                    <strong className="mr-auto">Alert</strong>
                                    <button
                                        type="button"
                                        className="ml-2 mb-1 close"
                                        onClick={this.resetNote}
                                        data-dismiss="toast"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="toast-body">
                                    "{this.state.title}" has been completed! Thank you for your submission.
                                </div>
                            </div>
                        </div>
                        <div>
                            {this.state.bugs.map((bug, index) => {
                                return (
                                    <div key={index}>
                                        <Link
                                            style={{ color: 'black' }}
                                            to={{ pathname: `/bugdetails/${bug._id}`, state: bug }}>
                                            {bug.title}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <Link className="btn btn-primary" to="/profile">
                            Account Information
                        </Link>
                    </div>
                );
            }
            return (
                <div>
                    <div>
                        {this.state.bugs.map((bug, index) => {
                            return (
                                <div key={index}>
                                    <Link
                                        style={{ color: 'black' }}
                                        to={{ pathname: `/bugdetails/${bug._id}`, state: bug }}>
                                        {bug.title}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
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
                <Chat
                    user={this.state.user}
                    companies={this.props.companies}
                    socket={this.props.socket}
                    setSocket={this.props.setSocket}
                    setNotifications={this.setNotifications}
                />
            </div>
        );
    }
}

export default UserHome;
