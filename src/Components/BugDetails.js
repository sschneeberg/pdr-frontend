import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

class BugDetails extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            bug: this.props.location.state,
            comment: '',
            comments: [],
            loading: false,
            error: false,
            redirect: false,
            redirectLogout: false
        };
    }

    getComments = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`)
            .then((response) => {
                if (response.data.msg) {
                    this.setState({ loading: false, error: true, redirect: true });
                } else {
                    const data = response.data.comments;
                    this.setState({ comments: data, loading: false, error: false });
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
    };

    displayComments = () => {
        return this.state.comments.map((comment, index) => {
            return (
                <div key={index}>
                    <p>{comment.comment}</p>
                    {this.props.user.permissions === 'admin' ? (
                        <Button variant="outline-danger" onClick={this.handleDelete}>
                            Delete Comment
                        </Button>
                    ) : null}
                </div>
            );
        });
    };

    handleDelete = () => {
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const { comment } = this.state;
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`, { comment })
            .then((response) => {
                if (typeof response.data.msg !== 'string') {
                    this.setState({ loading: false, error: true });
                } else {
                    this.getComments();
                    this.setState({ loading: false, error: false });
                }
            })
            .catch((e) => {
                this.setState({ loading: false, error: true });
                console.log(e);
            });
    };
    async componentDidMount() {
        this._isMounted = true;
        this.setState({ loading: true });
        await this.getComments();
        return (this._isMounted = false);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }
        const { bug } = this.state;
        return (
            <div>
                {this.state.redirectLogout ? <Redirect to="/" /> : null}
                {this.state.error ? (
                    <p>An error occurred, please reload the page and try again. Contact us if the problem persists.</p>
                ) : null}
                {this.state.loading ? <p>Loading...</p> : null}

                <ul>
                    <li>Title: {bug.title}</li>
                    <li>Priority: {bug.priority}</li>
                    <li>Status: {bug.status}</li>
                    <li>Product: {bug.product}</li>
                    <li>Description: {bug.description}</li>
                    <li>Created: {bug.createdAt}</li>
                    <img src={bug.picture} alt="" id="cloudinaryImg" />
                    <Link to="/home">Back To Dashboard</Link>
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <textarea type="text" name='comment' onChange={this.handleChange} id='comment-input'>{this.state.comment}</textarea>
                    <input type="submit" value='Post Comment' />
                </form>
                {this.displayComments()}
            </div>
        );
    }
}

export default BugDetails;
