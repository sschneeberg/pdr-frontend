
import React, { Component } from 'react';
import SubmitStepOne from './SubmitStepOne';
import SubmitStepTwo from './SubmitStepTwo';
import SubmitAll from './SubmitAll';
export class SubmitBug extends Component {
    state = {
        step: 1,
        // step 1
        company: '',
        product: '',
        // step 2
        title: '',             
        description: '',
        picture: '',         
        // createdBy: '',
    }
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
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }
    showStep = () => {
        const { step, company, product, title, description, picture } = this.state;
        if(step === 1)
            return (<SubmitStepOne 
                nextStep = {this.nextStep} 
                handleChange = {this.handleChange} 
                company= {company}
                product= {product}
            />);
        if(step === 2)
            return (<SubmitStepTwo 
                nextStep = {this.nextStep} 
                prevStep = {this.prevStep}
                handleChange = {this.handleChange} 
                title={title} 
                description={description}
                picture={picture}
            />);
        if(step === 3)
            return (<SubmitAll 
                company={company} 
                product={product}
                title={title} 
                description={description}
                picture={picture}
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