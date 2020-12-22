import React, { Component } from "react";
import axios from 'axios';

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state ={
            description: [],
            date: [],
            website: [],
            status: [],
            image: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/tickets/companies")
        .then(({ data }) => console.log(data))
        .catch(e => {
            console.log(e);
        })
    }

    render() {
        return(
        <div>
            
        </div>
        );
    }
}



export default UserHome;