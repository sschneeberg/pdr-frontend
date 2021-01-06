import React, { Component } from 'react';
import './Chat.css';

class MessagePanel extends Component {
    render() {
        const messages = this.props.activeChat
            ? this.props.activeChat.msgs.map((m, index) => {
                  let segmented = m.split('-');
                  let tag = segmented.shift();
                  let msg = segmented;
                  if (tag === 'c') {
                      return (
                          <li key={index} style={{ backgroundColor: '#e2e2e2', textAlign: 'left' }}>
                              {msg}
                          </li>
                      );
                  } else {
                      return (
                          <li key={index} style={{ backgroundColor: 'whitesmoke', textAlign: 'right' }}>
                              {msg}
                          </li>
                      );
                  }
              })
            : null;
        return (
            <div className="MessagePanel">
                <ul className="messages">
                    <li className="customerChat" style={{ backgroundColor: 'rgba(106, 163, 180, 0.6)' }}>
                        {this.props.activeChat ? this.props.activeChat.name : 'No conversation selected'}
                    </li>
                    {messages}
                </ul>
                {this.props.activeChat ? (
                    <form onSubmit={(e) => this.props.sendMessage(e)} className="messageBar">
                        <input
                            className="messageInput"
                            type="text"
                            onChange={(e) => this.props.handleChange(e)}
                            value={this.props.message}
                        />
                        <input className="messageSend" type="submit" value="Send" />
                        <input
                            className="conversationEnd"
                            type="button"
                            value="Close"
                            onClick={() => this.props.endChat()}
                        />
                    </form>
                ) : (
                    <form onSubmit={(e) => this.props.sendMessage(e)} className="messageBar">
                        <input
                            className="messageInput"
                            type="text"
                            onChange={(e) => this.props.handleChange(e)}
                            value={this.props.message}
                            disabled
                        />
                        <input className="messageSend" type="submit" value="Send" disabled />
                        <input
                            className="conversationEnd"
                            type="button"
                            value="Close"
                            onClick={() => this.props.endChat()}
                            disabled
                        />
                    </form>
                )}
            </div>
        );
    }
}

export default MessagePanel;
