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
            chats: { 1234: { msgs: ['c-hi', 's-hello'], name: 'bob' } },
            online: false
        };
    }

    componentDidMount() {
        console.log(this.state.socket);
        this.state.socket.on('sent-customer-message', (msg, customerSocket, username) => {
            if (this.state.online) {
                let chats = Object.assign({}, this.state.chats);
                let activeChat = this.state.activeChat;
                chats[customerSocket]
                    ? chats[customerSocket].msgs.push('c-' + msg)
                    : (chats[customerSocket] = { msgs: ['c-' + msg], name: username });
                if (activeChat.socket === customerSocket) {
                    activeChat.msgs.push('c-' + msg);
                    this.setState({
                        chats,
                        activeChat: {
                            socket: activeChat.socket,
                            name: activeChat.name,
                            msgs: activeChat.msgs
                        }
                    });
                } else {
                    this.setState({ chats });
                }
            }
        });
    }

    selectChat = (chat) => {
        this.setState({
            activeChat: { socket: chat, name: this.state.chats[chat].name, msgs: this.state.chats[chat].msgs },
            messages: this.state.chats[chat].msgs
        });
    };

    sendMessage = (e) => {
        e.preventDefault();
        console.log('send');
        let message = { text: 's-' + this.state.message, id: this.state.user.id };
        //take message, add to array of messages {text: text, id: user.id}
        let msgs = this.state.activeChat.msgs.slice(0, this.state.activeChat.msgs.length);
        msgs.push(message.text);
        let activeChat = this.state.activeChat;
        activeChat.msgs = msgs;
        let openChats = this.state.chats;
        openChats[activeChat.socket].msgs = activeChat.msgs;
        //emit to reciever's socket
        this.state.socket.emit('send-support-message', this.state.message, this.state.activeChat.socket);
        this.setState({ activeChat, message: '', chats: openChats });
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

    endChat = () => {
        this.socket.emit('end-chat', this.state.activeChat.socket);
    };

    render() {
        console.log('updated', this.state.chats);
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
                            <ChatSideBar selectChat={this.selectChat} chats={this.state.chats} />
                            <MessagePanel
                                sendMessage={this.sendMessage}
                                handleChange={this.handleChange}
                                activeChat={this.state.activeChat}
                                endChat={this.endChat}
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
