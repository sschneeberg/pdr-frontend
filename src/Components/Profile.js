import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile(props) {
    const [hidden, setHidden] = useState({ visibility: 'hidden' });

    const userData = (
        <>
            <div className="userInfo">
                <h1>Account Information</h1>
                <p>
                    <strong>Username:</strong> {props.user.username}
                </p>
                <p>
                    <strong>Email:</strong> {props.user.email}
                </p>
            </div>
            <div className="changeInfo">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal" tabindex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>
                    Please <Link to="/login">login</Link> to view this page
                </h3>
            </div>
        );
    };

    return <div>{props.user ? userData : errorDiv()}</div>;
}

export default Profile;
