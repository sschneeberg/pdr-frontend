import React, { Component } from 'react';

class SubmitStepTwo extends Component {
    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };
    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { title, description, handleChange } = this.props;
        return (
       
          <>
                <h2>Enter your ticket information:</h2>
                <label> <h5> Title: </h5> </label>
                <br />
                <input
                className= "titles"
                    type="text"
                    name="Title"
                    value={title}
                    onChange={handleChange('title')}
                    style={{ backgroundColor: this.props.titleColor }}
                    maxLength={30}
                    required
                /><br />
                <small>
                    {'('}30 Characters Maximum{')'}
                </small>
                <br />
                <label><h5> Description: </h5> </label>
                <input
                className="descriptions"
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChange('description')}
                    style={{ backgroundColor: this.props.descColor }}
                    required
                />
                <br />
                <small>
                    {'('}30 Characters Minimum{')'}
                </small>
                <br />
                <br />

                <button className="Backs" onClick={this.back}>
                    « Back
                </button>
                <button className="Nexts" onClick={this.continue}>
                    Next »
                </button>
                </>

        );
    }
}
export default SubmitStepTwo;
