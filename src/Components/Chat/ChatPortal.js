import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ChatSideBar from './ChatSideBar';
import MessagePanel from './MessagePanel';
import './Chat.css';

class ChatPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            socket: this.props.socket,
            user: this.props.user,
            activeChat: '',
            online: false
        };
    }

    selectChat = (chat) => {
        this.setState({ activeChat: chat });
    };

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

    toggleOnline = () => {
        if (this.state.online) {
            //if online, then becoming unavailable: disconnect from support room
            this.state.socket.emit(
                'support-unavailable',
                this.state.user.company,
                this.state.socket.id,
                this.state.user.permissions
            );
        } else {
            //becoming available: join support room
            this.state.socket.emit(
                'support-available',
                this.state.user.company,
                this.state.socket.id,
                this.state.user.permissions
            );
        }
        this.setState({ online: !this.state.online });
    };

    render() {
        return (
            <div className="container">
                {this.state.user.permissions ? (
                    <>
                        {this.state.online ? (
                            <Button variant="outline-danger" onClick={() => this.toggleOnline()}>
                                End Session
                            </Button>
                        ) : (
                            <Button variant="outline-success" onClick={() => this.toggleOnline()}>
                                Available
                            </Button>
                        )}
                        <div className="ChatPortal">
                            <ChatSideBar selectChat={this.selectChat} />
                            <MessagePanel
                                sendMessage={this.sendMessage}
                                handleChange={this.handleChange}
                                activeChat={this.state.activeChat}
                            />
                        </div>
                    </>
                ) : (
                    <Redirect to="/home" />
                )}
            </div>
        );
    }
}

export default ChatPortal;
