import React, { Component } from 'react';
import axios from "axios";


class SubmitAll extends Component {
    constructor(props){
        super(props)
        this.state= {
            loading: false,
            error: false
        }
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    submit = e => {
        e.preventDefault();
        const newTicket = {
            title: this.props.title,
            company: this.props.company,
            product: this.props.product,
            picture: this.props.picture,      
            description: this.props.description,
            createdBy: this.props.createdBy,
          }
          this.setState({loading: true})
          axios.post(`${process.env.REACT_APP_SERVER_URL}/api/tickets`, newTicket)
          .then(res => {
            if (res.data.msg) {
                 this.setState({loading: false, error: true})
            }else {
                this.setState({loading: false})
            }
          }).catch(err => {
              console.log(err);
          })
        }
    render(){
        const { company, product, title, description, picture } = this.props;
        return(
            <>
            {this.state.error === true ? (
                        <p style={{ color: 'red' }}>
                            An error occurred, please try updating your information again or contact us if the problem
                            persists.
                        </p>
                    ) : null}
                {this.state.loading ? <p>Loading...</p> : null}
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