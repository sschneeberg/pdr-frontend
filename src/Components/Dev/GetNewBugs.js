import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../../keys';

class GetNewBugs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: []
        };
    }

    async componentDidMount() {
        await axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard`)
            .then((response) => {
                const data = response.data.tickets;
                this.setState({ bugs: data });
                console.log('Data was recived');
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            })}

    displaybugs = () => {
        return (
            this.state.bugs.map((bug, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <li>{bug.title}</li>
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

export default GetNewBugs;




                // <Link className="btn btn-primary" to="/profile">
                //     Account Information
                // </Link>