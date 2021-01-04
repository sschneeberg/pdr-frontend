import React, { Component } from 'react';
class SubmitStepTwo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render(){
        const { title, description, picture, handleChange } = this.props;
        return(
            <>
                <h2>Enter your job information:</h2>
                <label>
                    <input 
                        type="text"
                        name="Title"
                        value={title}
                        onChange={handleChange('title')}
                        placeholder="Title"
                    />
                </label>
                <label>
                    <input 
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange('description')}
                        placeholder="Description"
                    />
                </label>
                <label>
                    <input 
                        type="text"
                        name="picture"
                        value={picture}
                        onChange={handleChange('picture')}
                        placeholder="Location"
                    />
                </label>
                <button className="Back" onClick={this.back}>
                    « Back
                </button>
                <button className="Next" onClick={this.continue}>
                    Next »
                </button>
            </>
        );
    }
}
export default SubmitStepTwo;