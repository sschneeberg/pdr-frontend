import React, { Component } from 'react';
import axios from 'axios';

class SubmitAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: true,
            imageUrl: undefined,
            imageAlt: undefined
        };
    }
    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    submit = (e) => {
        e.preventDefault();
        const newTicket = {
            title: this.props.title,
            companySelect: this.props.companySelect,
            product: this.props.product,
            picture: this.state.imageUrl,
            description: this.props.description
            //   createdBy: this.props.createdBy,
        };
        this.setState({ loading: true });
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/tickets`, newTicket)
            .then((res) => {
                if (res.data.msg) {
                    this.setState({ loading: false, error: true });
                } else {
                    this.setState({ loading: false });
                }
            })
            .catch((err) => {
                console.log(err);
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
                    imageAlt: `An image of ${res.original_filename}`
                });

                console.log('hello', res.secure_url);
            })
            .catch((err) => console.log(err));
    };

    openWidget = () => {
        window.cloudinary
            .createUploadWidget(
                {
                    cloudName: 'edgerees',
                    uploadPreset: 'knw1rnnh'
                },
                (error, { event, info }) => {
                    if (event === 'success') {
                        this.setState({
                            imageUrl: info.secure_url,
                            imageAlt: `An image of ${info.original_filename}`
                        });
                    }
                }
            )
            .open();
    };

    render() {
        const { companySelect, company, product, title, description } = this.props;
        const { imageUrl, imageAlt } = this.state;
        return (
            <>
                <main className="Images">
                    <section className="left-side">
                        <form>
                            {/* <div className="form-group">
                <input type="file" />
              </div>

              <button
                type="button"
                className="btn"
                onClick={this.handleImageUpload}
              >
                Submit
              </button> */}
                            <label>Upload a picture of your bug here.</label>
                            <button type="button" className="btn widget-btn" onClick={this.openWidget}>
                                Upload
                            </button>
                        </form>
                    </section>
                    <section className="right-side">
                        {imageUrl && <img src={imageUrl} alt={imageAlt} className="displayed-image" />}
                        <h2>Here is the information you entered:</h2>
                        Company: <b>{companySelect}</b>
                        <br />
                        Product: <b>{product}</b>
                        <br />
                        Title: <b>{title}</b>
                        <br />
                        Description: <b>{description}</b>
                        <br />
                    </section>
                </main>
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
