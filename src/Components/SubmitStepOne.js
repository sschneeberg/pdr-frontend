import React, { Component } from 'react';

class SubmitStepOne extends Component {
    state = {};

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        let company = this.props.company.map((company, i) => {
            return (
                <option value={company.name} key={i}>
                    {company.name}
                </option>
            );
        });
        const { product, handleChange, onChangeSelect } = this.props;

        return (
            <>
                <h2>Choose a company to submit your bug</h2>

                <label htmlFor="company">Companies: </label>
                <select
                    className="form-control"
                    id="company"
                    value={this.state.companySelect}
                    onChange={onChangeSelect}
                    required>
                    <option>Select a company</option>
                    {company}
                </select>

                <label>Product: </label>
                <input type="text" name="product" value={product} onChange={handleChange('product')} required />

                <button className="Next" onClick={this.continue}>
                    Next »
                </button>
            </>
        );
    }
}
export default SubmitStepOne;
