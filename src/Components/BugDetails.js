import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import REACT_APP_SERVER_URL from '../keys';
import { Link } from 'react-router-dom';

class BugDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bug: {title: '', product: '', description: '', createdAt: '', priority: '', status: ''},
            comment: '',
            comments: []

        };
    }


    getBugDetails = () => {
        axios.get(`${REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}`)
        .then((response) => {
            const data = response.data.ticket;
            this.setState({ bug: data });
        }).catch((e) => {
            console.log(e);
        })
    }

    getComments = () => {
        axios.get(`${REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`)
        .then((response) => {
            const data = response.data.comments;
            this.setState({ comments: data })
        }).catch((e) => {
            console.log(e);
        })
    }

    displayComments = () => {
        return this.state.comments.map((comment, index) => {
            return (
                <div key={index}>
                    <p>{comment.comment}</p>
                    {/* <Button
                    variant="outline-danger"
                    onClick={() => {
                        this.handleDelete();
                    }}>
                    Delete Comment
                </Button> */}
                </div>
            )
        })
    }

    // handleDelete = () => {
    //     axios.delete(`${REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`)
    //     .then((response) => {
    //         console.log(response);
    //     }).catch((e) => {
    //         console.log(e);
    //     })
    // }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {comment} = this.state
        axios.post(`${REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`, {comment} )
        .then((response) => {
            console.log(response);
            this.getComments();
        }).catch((e) => {
            console.log(e);
        })
    }
    
    componentDidMount() {
        this.getBugDetails();
        this.getComments();
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
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name='comment' onChange={this.handleChange}/>
                    <input type="submit" value='Post Comment'/>
                </form>
                {this.displayComments()}
            </div>
        )
    }
}

export default BugDetails;
