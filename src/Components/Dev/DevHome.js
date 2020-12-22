import React, { Component } from "react";

class DevHome extends Component {
    constructor(props) {
        super(props)
        this.state ={
            description: '',
            date: '',
            website: '',
            status: '',
            image: '',
            severity: ''
        }
    }

    // componentDidMount() {
    //     axios.get(`http://localhost:8000/api/tickets/`)
    //     .then(({ data }) => console.log(data))
    //     .catch(e => {
    //         console.log(e);
    //     })
    // }

    render() {
        return(
        <div>
            <div>
                Description of bug:
                Date/time submitted: 
                Website:
                Severity:
                Image of bug:
                button to move to in progess:
            </div>
            <div>
                Button to move to done:
            </div>
        </div>
        );
    }
}



export default DevHome;