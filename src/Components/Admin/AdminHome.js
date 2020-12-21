import React, { Component } from "react";

class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state ={

        }
    }
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
                button to assign bug to dev:
                Image of bug:
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