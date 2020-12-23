import React, { Component } from "react";
import axios from 'axios';

class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state ={
            description: '',
            projectDescription: '',
            date: '',
            website: '',
            status: '',
            image: '',
            severity: '',
            numOfBugsAssinged: '',
            devs: '',
            bugs: []
        }
    }

    async componentDidMount() {
        await axios.get(`http://localhost:8000api/dashboard/admin-dashboard`)
        .then((response) => {
            const data = response;
            console.log(data);
            // this.setState({ bugs: data });
            // console.log('Data was recived');
        })
        .catch(e => {
            console.log(e);
        })
    }

    // displaybugs = () => {
    //     return (
    //         this.state.bugs.map((bug, index) => {
    //             return (
    //                 <div>
    //                     <ul key={index}>
    //                         <li>{bug.title}</li>
    //                         <li>{bug.company}</li>
    //                         <li>{bug.product}</li>
    //                         <li>{bug.description}</li>
    //                         <li>{bug.status}</li>
    //                         <li>{bug.createdAt}</li>
    //                     </ul>
    //                 </div>
    //             )
    //         })
    //     )
    // }

    render() {
        return(
        <div>
            <div className='Project-details' >
                Description of project:
            </div>
            <div className='New-bugs'>
                Description of bug:
                Date/time submitted: 
                Website:
                Select status:
                Image of bug:
                button to assign bug to dev:
            </div>
            <div className='devs' >
                Dev names:
                Severity for each bug they have been assigned:
                How many bugs the dev is already assigned:
            </div>
        </div>
        );
    }
}

export default AdminHome;