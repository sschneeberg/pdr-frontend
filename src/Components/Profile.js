import React from 'react';
import { Link } from 'react-router-dom';

function Profile(props) {
    console.log(props);
    const userData = props.user ? (
        <div>
            <h1>Profile</h1>
            <p>
                <strong>Username:</strong> {props.user.username}
            </p>
            <p>
                <strong>Email:</strong> {props.user.email}
            </p>
            <p>
                <strong>ID:</strong> {props.user.id}
            </p>
        </div>
    ) : (
        <h4>Loading User Data...</h4>
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
