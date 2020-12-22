import React, { Component } from "react";

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state ={
            description: '',
            date: '',
            website: '',
            status: '',
            image: ''
        }
    }
    render() {
        return(
        <div>
            Description of bug:
            Date/time submitted:
            Website:
            Status:
            Image of bug:
        </div>
        );
    }
}



export default UserHome;