import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import REACT_APP_SERVER_URL from '../keys';
import { Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

class BugDetails extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            bug: this.props.location.state,
            comment: '',
            comments: []

        };
    }

    displayComments = () => {
        return this.state.comments.map((comment, index) => {
            return (
                <div key={index}>
                    <p>{comment.comment}</p>
                    {this.props.user.permissions === 'admin' ? 
                        <Button
                            variant="outline-danger"
                            onClick={this.handleDelete}>
                            Delete Comment
                        </Button> : null}
                </div>
            )
        })
    }

    handleDelete = () => {
        axios.delete(`${REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`)
        .then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        })
    }

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
    
    async componentDidMount() {
        this._isMounted = true;
        await axios.get(`${REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`)
        .then((response) => {
            const data = response.data.comments;
            this.setState({ comments: data })
        }).catch((e) => {
            console.log(e);
        })
        return this._isMounted = false;
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
                    <img src={bug.picture} alt="" />
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
