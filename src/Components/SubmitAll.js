import React, { Component } from 'react';
import axios from "axios";
class SubmitAll extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    submit = e => {
        e.preventDefault();
        console.log(this.props)
        const newTicket = {
            title: this.props.title,
            company: this.props.company,
            product: this.props.product,
            picture: this.props.picture,      
            description: this.props.description,
            createdBy: this.props.createdBy,
          }
          axios.post('http://localhost:8000/api/tickets', newTicket).then(res => {
              console.log(res);
          }).catch(err => {
              console.log(err);
          })
        }
    render(){
        const { company, product, title, description, picture } = this.props;
        console.log(this.props.title)
        return(
            <>
                <h2>Here is the information you entered:</h2>
                Company: <b>{company}</b><br />
                Product: <b>{product}</b><br />
                Title: <b>{title}</b><br />
                Description: <b>{description}</b><br />
                Picture: <b>{picture}</b><br />
                <button className="Back" onClick={this.back}>
                    « Back
                </button>
                <button className="Submit" onClick={this.submit}>
                     Submit 
                </button>
            </>
        );
    }
}
export default SubmitAll;