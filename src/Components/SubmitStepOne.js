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
        let product = null;
        if (this.props.companySelect) {
            product = this.props.product[this.props.companySelect].map((product, i) => {
                return (
                    <option value={product} key={i}>
                        {product}
                    </option>
                );
            });
        }

        const { onChangeProductSelect, onChangeSelect } = this.props;
        
        return (
            <><br />
                <h2>Choose a company<br /> to submit your bug</h2>
                <br />
                <label htmlFor="company">Companies: </label>
                <select className="titles" id="company" onChange={onChangeSelect} required>
                    <option>Select a company</option>
                    {company}
                </select>

                <label>Product: </label>
                <select className="descriptions" type="text"name="product" onChange={onChangeProductSelect} required>
                    <option>Select a Product</option>
                    {product}
                </select>
                <br />
                <br />
                <button type="submit" className="Nexts" onClick={this.continue}>
                    Next »
                </button>
            </>
        );
    }
}
export default SubmitStepOne;
