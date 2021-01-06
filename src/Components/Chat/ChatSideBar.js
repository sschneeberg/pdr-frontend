import React, { Component } from 'react';
import './Chat.css';

class ChatSideBar extends Component {
    render() {
        let openChats = [];
        for (const chat in this.props.chats) {
            openChats.push(
                <li
                    key={this.props.chats[chat].name}
                    className="customerChat"
                    onClick={() => this.props.selectChat(chat)}>
                    {this.props.chats[chat].name}
                </li>
            );
        }
        if (openChats.length === 0) {
            openChats = <li className="customerChat"> No chats currently active</li>;
        }

        return (
            <div className="sideBar">
                <ul className="chats">
                    <li className="customerChat" style={{ backgroundColor: 'rgba(106, 163, 180, 0.6)' }}>
                        Active Conversations
                    </li>
                    {openChats}
                </ul>
            </div>
        );
    }
}

export default ChatSideBar;
