import React, { Component } from 'react';
class SubmitStepOne extends Component{
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render(){
        const { company, product, handleChange } = this.props;
        return(
            <>
                <h2>Choose a company to submit your bug</h2>
                <label>
                    <input 
                        type="text"
                        name="company"
                        value={company}
                        placeholder="Company"
                        onChange={handleChange('company')}
                    />
                </label>
                <label>
                    <input 
                        type="text"
                        name="product"
                        value={product}
                        placeholder="Product"
                        onChange={handleChange('product')}
                    />
                </label>
                <button className="Next" onClick={this.continue}>
                    Next »
                </button>
            </>
        );
    }
}
export default SubmitStepOne;