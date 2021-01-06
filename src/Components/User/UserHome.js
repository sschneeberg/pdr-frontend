import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Chat from '../Chat/ChatBubble';
import FormSubmitted from '../FormSubmitted';
import { userDashHelp } from './HelpText';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: [],
            user: this.props.user,
            loading: false,
            redirect: false,
            socket: null,
            notification: false,
            title: null,
            ticketUser: null,
            error: false,
            redirectLogout: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.axiosCancelSource = axios.CancelToken.source();
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/dashboard`, { cancelToken: this.axiosCancelSource.token })
            .then((response) => {
                if (response.data.msg) {
                    this.setState({ loading: false, error: true, redirect: true });
                } else {
                    const data = response.data.tickets;
                    this.setState({ bugs: data, loading: false, error: false });
                    console.log(this.state.bugs);
                }
            })
            .catch((err) => {
                if (err.toString().includes('401')) {
                    this.setState({ redirectLogout: true });
                    this.props.handleLogout();
                } else {
                    this.setState({ loading: false, error: true, redirect: true });
                }
                console.log(err);
            });
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel('request canceled.');
    }

    resetNote = () => {
        return this.setState({ notification: false, title: null, ticketUser: null });
    };

    setNotifications = (updated) => {
        console.log(updated);
        if (updated.ticket.user === this.state.user.id) {
            this.setState({ notification: true, title: updated.ticket.title, ticketUser: updated.ticket.user });
        } else {
            return;
        }
    };

    render() {
        if (!this.props.user) {
            this.props.handleLogout();
            return <Redirect to="/" />;
        }

        const priorityMap = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
        const statusMap = { 1: 'Received', 2: 'In Review', 3: 'Closed' };

        const pageDisplay = () => {
            if (this.state.notification) {
                return (
                    <div>
                        {this.props.location.state ? (
                            <>{this.props.location.state.bugSubmitted ? <FormSubmitted /> : null}</>
                        ) : null}
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
                                <div className="toast-body" style={{fontFamily: "Helvetica"}}>
                                    "{this.state.title}" has been completed! Thank you for your submission.
                                </div>
                            </div>
                        </div>

                        <div className="big-div">
                            <p className="title">Reported Pests</p>
                            <div className="centered-home">
                                {this.state.bugs.map((bug, index) => {
                                    return (
                                        <>
                                        <Link
                                            style={{ color: 'black', textDecoration: 'none'}}
                                            to={{ pathname: `/bugdetails/${bug._id}`, state: bug }}>
                                            <div key={index} className="bug-details-link">
                                                <div>
                                                <p><strong>Title: </strong>"{bug.title}"</p>
                                                </div>
                                            <div>
                                                <p><strong>Company: </strong>"{bug.company}"</p>
                                            </div>
                                            <div>

                                                <strong>Status: </strong>
                                                {statusMap[bug.status]}
                                            </div>
                                            {bug.priority ? (
                                                <div>
                                                    <strong>Priority: </strong>
                                                    {priorityMap[bug.priority]}

                                                </div>
                                            ) : (
                                                <div>
                                                    <p><strong>Priority: </strong>Unassigned</p>
                                                </div>
                                            )}
                                            </div>
                                        </Link>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <div className="big-div">
                    <p className="title">Reported Pests</p>
                    {this.props.location.state ? (
                        <>{this.props.location.state.bugSubmitted ? <FormSubmitted /> : null} </>
                    ) : null}
                    <div className="centered-home">
                        {this.state.bugs.map((bug, index) => {
                            return (
                                <>
                                    <Link
                                    style={{ color: 'black', textDecoration: 'none'}}
                                    to={{ pathname: `/bugdetails/${bug._id}`, state: bug }}>
                                    <div key={index} className="bug-details-link">
                                        <div>
                                        <p><strong>Title: </strong>"{bug.title}"</p>
                                        </div>
                                    <div>
                                        <p><strong>Company: </strong>"{bug.company}"</p>
                                    </div>
                                    <div>

                                        <strong>Status: </strong>
                                        {statusMap[bug.status]}
                                    </div>
                                    {bug.priority ? (
                                        <div>
                                            <strong>Priority: </strong>
                                            {priorityMap[bug.status]}

                                        </div>
                                    ) : (
                                        <div>
                                            <p><strong>Priority: </strong>Unassigned</p>
                                        </div>
                                    )}
                                    </div>
                                    </Link>
                                </>
                            );
                        })}
                    </div>
                </div>
            );
        };

        return (
            <div>
                {this.state.error ? (
                    <p>An error occurred, please reload the page to try again. Contact us if the problem persists.</p>
                ) : null}
                {this.state.loading ? <p>Loading...</p> : null}
                <Link className="btn btn-primary" style={{float: "right", marginTop: "0"}} to="/profile"> 
                        Account Information
                    </Link>
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={
                        <Popover>
                            <Popover.Title as="h3">Dashboard Help</Popover.Title>
                            <Popover.Content>{userDashHelp}</Popover.Content>
                        </Popover>
                    }>
                    <Button variant="outline-secondary" style={{ borderRadius: '60%' }}>
                        ?
                    </Button>
                </OverlayTrigger>

                {pageDisplay()}
                {this.state.redirectLogout ? <Redirect to="/" /> : null}
                {this.state.redirect ? <Redirect to="/404" /> : null}
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
