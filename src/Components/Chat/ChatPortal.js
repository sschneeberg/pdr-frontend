import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ChatSideBar from './ChatSideBar';
import MessagePanel from './MessagePanel';
import './Chat.css';

class ChatPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            socket: this.props.socket,
            user: this.props.user
        };
    }

    sendMessage = (e) => {
        e.preventDefault();
        console.log('send');
        let message = { text: this.state.message, id: this.state.user.id };
        //take message, add to array of messages {text: text, id: user.id}
        let msgs = this.state.messages.slice(0, this.state.messages.length);
        msgs.push(message);
        //emit to reciever's socket
        this.state.socket.emit('send-message', message);
        this.setState({ messages: msgs, message: '' });
    };

    handleChange = (e) => {
        this.setState({ message: e.target.value });
    };

    render() {
        return (
            <div className="ChatPortal container">
                {this.state.user.permissions ? (
                    <>
                        <ChatSideBar />
                        <MessagePanel sendMessage={this.sendMessage} handleChange={this.handleChange} />
                    </>
                ) : (
                    <Redirect to="/home" />
                )}
            </div>
        );
    }
}

export default ChatPortal;
