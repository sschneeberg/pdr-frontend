import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

class ChatSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            tickets: [],
            ticektMap: {},
            ticektDetails: '',
            searchParam: '',
            show: false
        };
    }

    async componentDidMount() {
        //collect tickets for this company
        //LATER: Makte this search mroe efficient to search by customer username with a post route on submit form and not dig up ALL company records
        this.setState({loading: true})
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/tickets/search`);
        if (response.data.tickets) {
            let ticketMap = {};
            let tickets = response.data.tickets;
            for (let i = 0; i < tickets.length; i++) {
                const ticket = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${tickets[i]._id}`);
                if (ticket.data.createdBy) {
                    if (ticketMap[ticket.data.createdBy.username]) {
                        ticketMap[ticket.data.createdBy.username].push({
                            id: ticket.data.ticket._id,
                            title: ticket.data.ticket.title,
                            status: ticket.data.ticket.status,
                            assignedTo: ticket.data.assignedTo ? ticket.data.assignedTo.username : 'Unassigned'
                        });
                    } else {
                        ticketMap[ticket.data.createdBy.username] = [
                            {
                                id: ticket.data.ticket._id,
                                title: ticket.data.ticket.title,
                                status: ticket.data.ticket.status,
                                assignedTo: ticket.data.assignedTo ? ticket.data.assignedTo.username : 'Unassigned'
                            }
                        ];
                    }
                }
            }
            this.setState({ ticketMap });
        }
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    searchTickets = (e) => {
        e.preventDefault();
        let matchedTickets = 'No results found for this user.';
        //search for tickets with user Id
        if (this.state.ticketMap[this.state.searchParam]) matchedTickets = this.state.ticketMap[this.state.searchParam];
        this.setState({ tickets: matchedTickets });
    };

    render() {
        const status = { 1: 'Recieved', 2: 'In Review', 3: 'Closed' };
        let tickets = this.state.tickets;

        if (typeof this.state.tickets === 'object') {
            tickets = this.state.tickets.map((ticket) => {
                return (
                    <li key={ticket.id} className="searchTicket">
                        <h3>{ticket.title}</h3>
                        <p>Status: {status[ticket.status]}</p>
                        <p>Assigned To: {ticket.assignedTo}</p>
                    </li>
                );
            });
        }

        return (
            <div className="InChatSearch">
                <Button variant="outline-info" onClick={this.handleShow}>
                    Search Reports
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Search Submitted Reports</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <form onSubmit={(e) => this.searchTickets(e)}>
                                    <input
                                        type="text"
                                        id="search"
                                        value={this.state.searchParam}
                                        onChange={(e) => this.setState({ searchParam: e.target.value })}
                                    />
                                    <input type="submit" value="Go" />
                                    <small id="searchHelpBlock" className="form-text text-muted">
                                        Search submitted reports by customer username
                                    </small>
                                </form>
                                {tickets}
                            </>
                        )}
                        {this.state.error ? (
                            <p style={{ color: 'red' }}>
                                An error occurred, please contact us if the problem persists.
                            </p>
                        ) : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ChatSearch;
