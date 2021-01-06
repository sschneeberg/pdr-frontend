import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import { Button, Modal } from 'react-bootstrap';

class SubmitAll extends Component {
    state = {
        imageUrl: undefined,
        imageAlt: undefined,
        redirect: false,
        show: false,
        error: false
    };

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    submit = (e) => {
        e.preventDefault();
        let creator = this.props.createdBy;
        if (this.props.user) creator = this.props.user.id;
        const newTicket = {
            title: this.props.title,
            company: this.props.companySelect,
            product: this.props.product,
            picture: this.state.imageUrl,
            description: this.props.description,
            id: creator
        };
        console.log(newTicket);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/tickets`, newTicket).then((newTicket) => {
            console.log(newTicket);
            if (typeof newTicket.data.msg === 'string') {
                this.setState({ redirect: true, error: false });
            } else {
                this.setState({ error: true });
            }
        });
    };
    handleImageUpload = () => {
        const { files } = document.querySelector('input[type="file"]');

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'knw1rnnh');

        const options = {
            method: 'POST',
            body: formData
        };
        return fetch('https://api.cloudinary.com/v1_1/edgerees/image/upload', options)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    imageUrl: res.secure_url,
                    imageAlt: `An image of ${res.original_filename}`,
                    error: false
                });
            })
            .catch((err) => this.setState({ error: true }));
    };

    openWidget = () => {
        window.cloudinary
            .createUploadWidget(
                {
                    cloudName: 'edgerees',
                    uploadPreset: 'knw1rnnh'
                },
                (error, { event, info }) => {
                    if (error) this.setState({ error: true });
                    if (event === 'success') {
                        this.setState({
                            imageUrl: info.secure_url,
                            imageAlt: `An image of ${info.original_filename}`,
                            error: false
                        });
                    }
                }
            )
            .open();
    };

    render() {
        const { companySelect, company, title, description } = this.props;
        const { imageUrl, imageAlt } = this.state;
        return (

            <form class="form-wrapper">
            <fieldset class="section is-active">
            <>                       
             <h3>Here is the information you entered:</h3>
             <p> If you would like to recieve feedback, please log in before you submit.</p>
                {this.props.user ? null : (
                    <div>
                        <Button variant="outline-primary" onClick={this.handleShow}>
                            Login
                        </Button>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Login and Submit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Login
                                    nowCurrentUser={this.props.nowCurrentUser}
                                    setIsAuthenticated={this.props.setIsAuthenticated}
                                    user={this.props.user}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>
                )}  {this.state.error ? (
                    <p>
                        An error occured, please try submitting your report again or contact us if the problem persists.
                    </p>
                ) : null}
                <main className="Images">
                    <section className="left-side">
                        <form>
                            <label>Upload a picture of your bug here.</label>
                            <button type="button" className="btn widget-btn" onClick={this.openWidget}>
                                Upload
                            </button>
                        </form>
                    </section>
                    <section className="right-side">
                        {imageUrl && <img src={imageUrl} alt={imageAlt} className="displayed-image" />}

                        Company: <b>{companySelect}</b>
                        <br />
                        Product: <b>{this.props.product}</b>
                        <br />
                        Title: <b>{title}</b>
                        <br />
                        Description: <b>{description}</b>
                        <br />
                    </section>
                </main>
                
                {this.state.redirect ? (
                    <>
                        {this.props.createdBy || this.props.user.id ? (
                            <Redirect to={{ pathname: '/home', state: { bugSubmitted: true } }} />
                        ) : (
                            <Redirect to="/formSubmitted" />
                        )}
                    </>
                ) : null}

              

                <button className="Back" onClick={this.back}>
                    « Back
                </button>
                <button className="Submit" onClick={this.submit}>
                    Submit
                </button>
            </>  
            </fieldset>
            </form >
          
        );
    }
}
export default SubmitAll;
