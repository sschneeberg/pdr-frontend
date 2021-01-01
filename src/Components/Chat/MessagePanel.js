import React, { Component } from 'react';
import './Chat.css';

class MessagePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            activeChat: this.props.activeChat
        };
    }

    render() {
        return (
            <div className="MessagePanel">
                <ul className="messages">
                    <li className="customerChat" style={{ backgroundColor: 'lightblue' }}>
                        {this.props.activeChat ? this.state.activeChat.name : 'No conversation selected'}
                    </li>
                    {this.state.messages}
                </ul>
                <form onSubmit={(e) => this.props.sendMessage(e)} className="chatBar" style={{ display: 'flex' }}>
                    <input type="text" onChange={(e) => this.props.handleChange(e)} value={this.state.message} />
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default MessagePanel;
