import React, { Component } from 'react';
import SubmitStepOne from './SubmitStepOne';
import SubmitStepTwo from './SubmitStepTwo';
import SubmitAll from './SubmitAll';

export class SubmitBug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            // step 1
            company: props.companies,
            companySelect: '',
            productSelect: '',
            product: props.products,
            titleColor: 'white',
            descColor: 'white',
            // step 2
            title: '',
            description: '',
            imageUrl: '',
            createdBy: ''
        };
    }

    componentDidMount = () => {
        if (this.props.user === '') {
            this.setState({ createdBy: null });
        } else {
            this.setState({ createdBy: this.props.user.id });
        }
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };
    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
        if (input === 'title') {
            e.target.value.length > 30
                ? this.setState({ titleColor: 'rgba(181, 18, 9, 0.4)' })
                : this.setState({ titleColor: 'rgba(9, 181, 38, 0.4)' });
        } else if (input === 'description') {
            e.target.value.length < 30
                ? this.setState({ descColor: 'rgba(181, 18, 9, 0.4)' })
                : this.setState({ descColor: 'rgba(9, 181, 38, 0.4)' });
        }
    };

    onChangeSelect = (e) => {
        this.setState({ companySelect: e.target.value });
    };

    onChangeProductSelect = (e) => {
        console.log(e.target.value);
        this.setState({ productSelect: e.target.value });
    };

    showStep = () => {
        const { step, company, product, title, description, imageUrl, companySelect, createdBy } = this.state;
        if (step === 1)
            return (
                <SubmitStepOne
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    onChangeSelect={this.onChangeSelect}
                    onChangeProductSelect={this.onChangeProductSelect}
                    company={company}
                    productSelect={this.state.productSelect}
                    companySelect={companySelect}
                    product={product}
                />
            );
        if (step === 2)
            return (
                <SubmitStepTwo
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    title={title}
                    description={description}
                    descColor={this.state.descColor}
                    titleColor={this.state.titleColor}
                />
            );
        if (step === 3)
            return (
                <SubmitAll
                    companySelect={companySelect}
                    product={this.state.productSelect}
                    title={title}
                    description={description}
                    createdBy={createdBy}
                    imageUrl={imageUrl}
                    prevStep={this.prevStep}
                    nowCurrentUser={this.props.nowCurrentUser}
                    setIsAuthenticated={this.props.setIsAuthenticated}
                    user={this.props.user}
                />
            );
    };
    render() {
        const { step } = this.state;
        return (
            <>
            <div class="container">
            <div class="wrapper">

     
            <ul class="steps">
            <li class="is-active"><h2>Step {step} of 3.</h2></li>

            </ul>

                {this.showStep()}

            </div></div>
            </>
        );
    }
}
export default SubmitBug;
