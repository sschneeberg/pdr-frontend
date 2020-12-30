import React, { Component } from 'react';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../keys';
import { Link } from 'react-router-dom';

class BugDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bug: {title: '', product: '', description: '', createdAt: '', priority: '', status: ''}
        };
    }

    componentDidMount() {
       axios.get(`${REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}`)
        .then((response) => {
            const data = response.data.ticket;
            console.log(data);
            this.setState({ bug: data });
        }).catch((e) => {
            console.log(e);
        })
    }
    render() {
        const {bug} = this.state;
        return (
            <div>
                <ul>
                    <li>Title: {bug.title}</li>
                    <li>Priority: {bug.priority}</li>
                    <li>Status: {bug.status}</li>
                    <li>Product: {bug.product}</li>
                    <li>Description: {bug.description}</li>
                    <li>Created: {bug.createdAt}</li>
                    <Link to='/home'>Back To Dashboard</Link>
                </ul>
            </div>
        )
    }
}

export default BugDetails;
