import React, { Component } from 'react';
import io from 'socket.io-client';
import REACT_APP_SERVER_URL from '../../keys';
import '../../App.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    text:
                        'Hello, Welcome to Quick Chat. If you leave the page or close the chat, this chat session will end',
                    id: 1
                }
            ],
            message: '',
            user: this.props.user,
            hide: true,
            socket: '',
            company: '',
            notifications: '',
            companies: this.props.companies || [],
            online: false
        };
    }

    componentDidMount() {
        const socket = io(REACT_APP_SERVER_URL);
        socket.on('connect', () => {
            console.log('connected to back end: ', socket.id);

            if (this.state.user.company) {
                this.setState({ company: this.state.user.company });
                socket.emit(
                    'join-company',
                    this.state.user.company,
                    socket.id,
                    this.state.user.permissions || 'customer'
                );
            }
        });
        socket.on('sent-message', (msg) => {
            let msgs = this.state.messages.slice(0, this.state.messages.length);
            msgs.push(msg);
            if (this.state.hide) {
                let ntf = parseInt(this.state.notifications) + 1 || 1;
                this.setState({ notifications: ntf });
            }
            this.setState({ messages: msgs });
        });

        socket.on('joined-room', (active) => {
            let msgs = this.state.messages.slice(0, this.state.messages.length);
            if (active >= 1) {
                msgs.push({ text: 'Company representatives are currently online', id: 3 });
            } else {
                msgs.push({
                    text:
                        'No company representatives are currently online. Please try again at another time or submit a report to formally register your issue.',
                    id: 3
                });
            }
            this.setState({ messages: msgs });
        });

        this.setState({ socket });
    }

    expandChat = () => {
        //if closing this chat, clear the messages
        if (!this.state.hide) {
            this.setState({
                company: this.state.user.company || '',
                messages: this.state.messages.slice(0, 1),
                message: '',
                online: false
            });
        } else {
            this.setState({ notifications: '' });
        }
        this.setState({ hide: !this.state.hide });
    };

    handleChange = (e) => {
        this.setState({ message: e.target.value });
    };

    onChangeSelect = (e) => {
        let msgs = this.state.messages.slice(0, this.state.messages.length);
        msgs.push({ text: `You are connected to ${e.target.value}`, id: 2 });
        this.setState({ company: e.target.value, messages: msgs });
        this.state.socket.emit('join-company', e.target.value, this.state.socket.id);
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

    render() {
        const msgList = this.state.messages.map((m, index) => {
            return this.state.user.id === m.id ? (
                <li key={index} style={{ backgroundColor: 'slategray', textAlign: 'right' }}>
                    {m.text}
                </li>
            ) : (
                <li key={index} style={{ backgroundColor: 'lightblue' }}>
                    {m.text}
                </li>
            );
        });

        let companyInfo = this.state.companies.map((c, i) => {
            return (
                <option value={c.name} key={i}>
                    {c.name}
                </option>
            );
        });

        const companyForm = (
            <div className="form-group chatForm">
                <label htmlFor="company">Companies: </label>
                <select
                    className="form-control"
                    id="company"
                    value={this.state.company}
                    onChange={(e) => this.onChangeSelect(e)}>
                    <option>Select a company</option>
                    {companyInfo}
                </select>
            </div>
        );

        return (
            <div className="chat">
                {this.state.hide ? (
                    this.state.user.company && this.state.notifications ? (
                        <button type="button" className="notificationsBubble btn btn-danger">
                            <p>{this.state.notifications}</p>
                        </button>
                    ) : null
                ) : (
                    <div className="chatWindow">
                        <ul className="messages">{msgList}</ul>
                        {this.state.company ? (
                            <form onSubmit={(e) => this.sendMessage(e)} className="chatBar" style={{ display: 'flex' }}>
                                <input type="text" onChange={(e) => this.handleChange(e)} value={this.state.message} />
                                <input type="submit" value="Send" />
                            </form>
                        ) : (
                            companyForm
                        )}
                    </div>
                )}

                <button
                    className="btn btn-info float-right"
                    style={{ borderRadius: '45%' }}
                    type="button"
                    onClick={() => this.expandChat()}>
                    <svg
                        style={{ paddingTop: '3px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chat-right-dots-fill"
                        viewBox="0 0 16 16">
                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                </button>
            </div>
        );
    }
}

export default Chat;
