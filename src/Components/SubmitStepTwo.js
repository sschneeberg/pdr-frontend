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
            <form class="form-wrapper">
            <fieldset class="section is-active">

            <>
                <h2>Enter your ticket information:</h2>
                <label> <h5> Title: </h5> </label>
                <input
                    type="text"
                    name="Title"
                    value={title}
                    onChange={handleChange('title')}
                    style={{ backgroundColor: this.props.titleColor }}
                    maxLength={30}
                    required
                />
                <small>
                    {'('}30 Characters Maximum{')'}
                </small>
<br />
                <label><h5> Description: </h5> </label>
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChange('description')}
                    style={{ backgroundColor: this.props.descColor }}
                    required
                />
                <small>
                    {'('}30 Characters Minimum{')'}
                </small>

                <button className="Back" onClick={this.back}>
                    « Back
                </button>
                <button className="Next" onClick={this.continue}>
                    Next »
                </button>
                </>
         
         </fieldset>
          </form>
        );
    }
}
export default SubmitStepTwo;
