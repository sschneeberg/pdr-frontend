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
        const openChats = this.state.openChats ? (
            this.state.openChats.map((chat, index) => (
                <li key={index} className="customerChat" onClick={() => this.props.selectChat(chat)}>
                    {chat.name} ({chat.notifications})
                </li>
            ))
        ) : (
            <li className="customerChat"> No chats currently active</li>
        );

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
