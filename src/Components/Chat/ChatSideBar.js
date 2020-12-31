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
        return (
            <div className="sideBar">
                <ul>{this.state.openChats}</ul>
            </div>
        );
    }
}

export default ChatSideBar;
