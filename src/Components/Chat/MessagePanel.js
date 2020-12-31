import React, { Component } from 'react';
import './Chat.css';

class MessagePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages
        };
    }

    render() {
        return (
            <div className="MessagePanel">
                <ul>{this.state.messages}</ul>
                <form onSubmit={(e) => this.props.sendMessage(e)} className="chatBar" style={{ display: 'flex' }}>
                    <input type="text" onChange={(e) => this.props.handleChange(e)} value={this.state.message} />
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default MessagePanel;
