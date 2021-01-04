import React, { Component } from 'react';
class SubmitStepOne extends Component{

state = {

    };

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render(){
         let company = this.props.company.map((company, i) => {
         return (<option value={company.name} key={i}>{company.name}</option>)
        })
        const {product, handleChange, onChangeSelect} = this.props;

    return(
            <>
                <h2>Choose a company to submit your bug</h2>
                

              <label htmlfor="company">Companies: </label>
                                    <select className="form-control" id="company" value={this.state.companySelect} onChange={onChangeSelect}>
                                        <option>Select a company</option>
                                    {company}
                                    </select>

                <label>
                    <input 
                        type="text"
                        name="product"
                        value={product}
                        placeholder="Product"
                        onChange={handleChange('product')}
                    />
                   {this.state.productError ? ( <div style={{ fontSize: 12, color: 'red' }}>
                        {this.state.productError}
                    </div> ): null}
                </label>
                <button className="Next" onClick={this.continue}>
                    Next »
                </button>
            </>
        );
    }
}
export default SubmitStepOne;