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

        console.log(this.props.productSelect);
        return (
            <form class="form-wrapper">
            <fieldset class="section is-active">

            <>
                <h3>Choose a company to submit your bug</h3>

                <label htmlFor="company">Companies: </label>
                <select className="form-control" id="company" id="name" onChange={onChangeSelect} required>
                    <option>Select a company</option>
                    {company}
                </select>

                <label>Product: </label>
                <select className="form-control" type="text" id="email" name="product" onChange={onChangeProductSelect} required>
                    <option>Select a Product</option>
                    {product}
                </select>
               
                <button className="Next" onClick={this.continue}>
                    Next »
                </button>
            </>
         
            </fieldset>
             </form>
        );
    }
}
export default SubmitStepOne;
