import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './BugDetails.css';

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
            console.log(comment.commentBy === this.props.user.id);
            return (
                <>
                    {comment.commentBy === this.props.user.id ? (
                        <div className="Comment" style={{ backgroundColor: 'rgba(106, 163, 180, 0.6)' }} key={index}>
                            <p>
                                <span>{this.makeDate(comment.createdAt).join('/')}</span> {comment.comment}
                            </p>
                            {this.props.user.permissions === 'admin' ? (
                                <Button variant="outline-danger" onClick={() => this.handleDelete(comment._id)}>
                                    Delete Comment
                                </Button>
                            ) : null}
                        </div>
                    ) : (
                        <div className="Comment" key={index}>
                            <p>
                                <span>{this.makeDate(comment.createdAt).join('/')}</span> {comment.comment}
                            </p>

                            {this.props.user.permissions === 'admin' ? (
                                <Button variant="outline-danger" onClick={() => this.handleDelete(comment._id)}>
                                    Delete Comment
                                </Button>
                            ) : null}
                        </div>
                    )}
                </>
            );
        });
    };

    handleDelete = (id) => {
        this.setState({ loading: true });
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${id}/comments`)
            .then((response) => {
                if (typeof response.data.msg === 'string') {
                    this.setState({ loading: false, error: false });
                    this.getComments();
                } else {
                    this.setState({ loading: false, error: true, redirect: true });
                }
            })
            .catch((e) => {
                this.setState({ loading: false, error: true, redirect: true });
                console.log(e);
            });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let { comment } = this.state;
        const permissionsMap = { dev: 'Support', admin: 'Admin' };
        let userTag = permissionsMap[this.props.user.permissions] || '';
        comment = '[' + userTag + '] ' + comment;
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`, { comment })
            .then((response) => {
                if (typeof response.data.msg !== 'string') {
                    this.setState({ loading: false, error: true });
                } else {
                    this.getComments();
                    this.setState({ loading: false, error: false, comment: '' });
                }
            })
            .catch((e) => {
                this.setState({ loading: false, error: true });
                console.log(e);
            });
    };
    async componentDidMount() {
        this._isMounted = true;
        if (!this.props.user) this.setState({ redirect: true });
        this.setState({ loading: true });
        this.getComments();
        return (this._isMounted = false);
    }

    makeDate(date) {
        let dateArray = date.toString().split('T')[0].split('-');
        return [dateArray[1], dateArray[2], dateArray[0]];
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }

        const { bug } = this.state;

        const priorityMap = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
        const statusMap = { 1: 'Received', 2: 'In Review', 3: 'Closed' };

        return (
            <div>
                {this.state.redirectLogout ? <Redirect to="/" /> : null}
                {this.state.error ? (
                    <p>An error occurred, please reload the page and try again. Contact us if the problem persists.</p>
                ) : null}
                {this.state.loading ? <p>Loading...</p> : null}
                <Link className="DashLink" to="/home">
                    Back To Dashboard
                </Link>
                <div className="Ticket">
                    <h2>{bug.title}</h2>
                    <div className="details">
                        <p>Priority: {priorityMap[bug.priority]}</p>
                        <p>Status: {statusMap[bug.status]}</p>
                        <p>Product: {bug.product}</p>
                    </div>
                    <p>{bug.description}</p>
                    <p className="date">Created: {this.makeDate(bug.createdAt).join('/')}</p>
                    <img src={bug.picture} alt="" id="cloudinaryImg" />
                </div>
                <div className="commentForm">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="comment">Comment: </label>
                        <textarea
                            type="text"
                            name="comment"
                            onChange={this.handleChange}
                            id="comment-input"
                            value={this.state.comment}></textarea>
                        <input type="submit" value="Post Comment" />
                    </form>
                </div>
                {this.displayComments()}
            </div>
        );
    }
}

export default BugDetails;
