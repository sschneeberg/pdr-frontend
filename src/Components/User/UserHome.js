import React, { Component } from "react";
import axios from 'axios';

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state ={
            bugs: []
        }
    }

    async componentDidMount() {
        await axios.get(`http://localhost:8000/api/dashboard`)
        .then((response) => {
            const data = response.data.tickets;
            this.setState({ bugs: data });
            console.log('Data was recived');
        })
        .catch(e => {
            console.log(e);
        })
    }

    displaybugs = () => {
        return (
            this.state.bugs.map((bug, index) => {
                return (
                    <div>
                        <ul key={index}>
                            <li>{bug.title}</li>
                            <li>{bug.company}</li>
                            <li>{bug.product}</li>
                            <li>{bug.description}</li>
                            <li>{bug.status}</li>
                            <li>{bug.createdAt}</li>
                        </ul>
                    </div>
                )
            })
        )
    }

    render() {
        return(
        <div>
            {this.displaybugs()}
        </div>
        );
    }
}



export default UserHome;
