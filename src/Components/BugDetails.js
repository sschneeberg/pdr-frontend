import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

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
            redirect: false
        };
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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const {comment} = this.state
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`, {comment} )
        .then((response) => {
            if (response.data.msg) {
                this.setState({laoding: false, error: true})
            } else {
                this.getComments();
                this.setState({loading: false})
            }
            
        }).catch((e) => {
            console.log(e);
        })
    }
    
    async componentDidMount() {
        this._isMounted = true;
        this.setState({loading: true})
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${this.props.match.params.id}/comments`)
        .then((response) => {
            if (response.data.msg) {
                this.setState({loading: false, error: true, redirect: true})
            } else {
                 const data = response.data.comments;
                this.setState({ comments: data, loading: false })
            }
        }).catch((e) => {
            console.log(e);
        })
        return this._isMounted = false;
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }
        const {bug} = this.state;
        return (
            <div>
                {this.state.error ? (
                            <p>
                                An error occurred, please reload the page to try again. Contact us if the problem
                                persists.
                            </p>
                        ) : null }
                {this.state.loading ? <p>Loading...</p> : null}
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
