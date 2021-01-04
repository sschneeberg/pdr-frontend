import React, { Component } from 'react';
import SubmitStepOne from './SubmitStepOne';
import SubmitStepTwo from './SubmitStepTwo';
import SubmitAll from './SubmitAll';

export class SubmitBug extends Component {
    constructor (props) {
            super(props)
            console.log(this.props)
    this.state = {
        step: 1,
        // step 1
        company: props.companies,
        companySelect: '',
        product: '',
        // step 2
        title: '',             
        description: '',
        imageUrl: "",  
        // createdBy: '',
        productError: 'Please enter a product',
    }}


    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    validate = () => {
        let productError= '';

        if (this.state.product.includes("@")) {
            productError = "Please Enter product";
        }
        if (productError) {
            this.setState({productError});
            return false;
        }
        return true
    };

    handleChange = input => e => {
        const isValid = this.validate();
        if(isValid) {
            console.log(this.state)
        }
        this.setState({[input]: e.target.value});
    }
    onChangeSelect = (e) => {
        this.setState({companySelect: e.target.value})
    }
    showStep = () => {
        const { step, company, product, title, description, imageUrl , productError, companySelect} = this.state;
        if(step === 1)
            return (<SubmitStepOne 
                nextStep = {this.nextStep} 
                handleChange = {this.handleChange} 
                onChangeSelect = {this.onChangeSelect}
                company= {company}
                companySelect={companySelect}
                product= {product}
                productError= {productError}
                validate={this.validate}
                onChange={this.handleDropDown}
            />);
        if(step === 2)
            return (<SubmitStepTwo 
                nextStep = {this.nextStep} 
                prevStep = {this.prevStep}
                handleChange = {this.handleChange} 
                title={title} 
                description={description}
            />);
        if(step === 3)
            return (<SubmitAll 
                companySelect={companySelect} 
                product={product}
                title={title} 
                description={description}
                imageUrl={imageUrl}
                prevStep = {this.prevStep}
            />);
    }
    render(){
        const { step } = this.state;
        return(
            <>
                <h2>Step {step} of 3.</h2>
                {this.showStep()}
            </>
        );
    }
}
export default SubmitBug;
