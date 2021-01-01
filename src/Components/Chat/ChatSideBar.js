import React, { Component } from 'react';
import './Chat.css';

class ChatSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openChats: this.props.chats
        };
    }
    render() {
        let openChats = [];
        for (const chat in this.state.openChats) {
            openChats.push(
                <li
                    key={this.state.openChats[chat].name}
                    className="customerChat"
                    onClick={() => this.props.selectChat(chat)}>
                    {this.state.openChats[chat].name}
                </li>
            );
        }
        if (openChats.length === 0) {
            openChats = <li className="customerChat"> No chats currently active</li>;
        }

        return (
            <div className="sideBar">
                <ul className="chats">
                    <li className="customerChat" style={{ backgroundColor: 'lightblue' }}>
                        Active Customer Conversations
                    </li>
                    {openChats}
                </ul>
            </div>
        );
    }
}

export default ChatSideBar;
