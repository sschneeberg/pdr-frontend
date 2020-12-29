import React, { Component } from 'react';
import io from 'socket.io-client';
import REACT_APP_SERVER_URL from '../../keys';
import '../../App.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: '',
            user: this.props.user,
            hide: true
        };
    }

    expandChat = () => {
        this.setState({ hide: !this.state.hide });
    };

    render() {
        const socket = io(REACT_APP_SERVER_URL);
        socket.on('connect', () => {
            console.log('connected to back end: ', socket.id);
        });

        return (
            <div className="chat">
                {this.state.hide ? (
                    <div className="chatWindow hide">
                        <ul className="messages"></ul>
                        <div className="input" style={{ display: 'flex' }}>
                            <input type="text" onChange={this.handleChange} />
                            <input type="button" onClick={this.sendMessage} value="Send" />
                        </div>
                    </div>
                ) : (
                    <div className="chatWindow">
                        <ul className="messages"></ul>
                        <div className="input" style={{ display: 'flex' }}>
                            <input type="text" onChange={this.handleChange} />
                            <input type="button" onClick={this.sendMessage} value="Send" />
                        </div>
                    </div>
                )}

                <button
                    className="btn btn-info float-right"
                    style={{ borderRadius: '45%' }}
                    type="button"
                    onClick={this.expandChat}>
                    <svg
                        style={{ paddingTop: '3px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chat-right-dots-fill"
                        viewBox="0 0 16 16">
                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                </button>
            </div>
        );
    }
}

export default Chat;
