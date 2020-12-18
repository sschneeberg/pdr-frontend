import React from 'react';

function FormField(props) {
    return (
        <div className="form-field">
            <label htmlFor={props.label}>{props.display}</label>
            <input type={props.type} value={props.value} name={props.label} onChange={props.onChange} className="form-control" />
        </div>
    );
}

export default FormField;
