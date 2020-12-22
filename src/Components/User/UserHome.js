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
        console.log(this.props.user);
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
        // return bugs.map((bugs, index) => {
        //     <ul key={index}>
        //         <li>{bugs.tickets.title}</li>
        //     </ul>
        // })
        return (
            this.state.bugs.map((bug, index) => {
                return (
                    <div>
                        <ul>
                            <li key={index}>{bug.title}</li>
                            <li key={index}>{bug.company}</li>
                            <li key={index}>{bug.product}</li>
                            <li key={index}>{bug.description}</li>
                            <li key={index}>{bug.status}</li>
                            <li key={index}>{bug.createdAt}</li>
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





// async componentDidMount() {
//     console.log(this.props.user);
//     await axios.get(`http://localhost:8000/api/dashboard`)
//     .then((response) => {
//         const data = response.data;
//         this.setState({ bugs: data });
//         const display = this.state.bugs.map((bugs, index) => {
//             <ul key={index}>
//                 <li>{bugs.tickets.title}</li>
//             </ul>
//         })
//         this.setState({ displaybugs: display })
//         console.log('Data was recived');
//     })
//     .catch(e => {
//         console.log(e);
//     })
// }