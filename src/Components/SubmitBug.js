
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SubmitBug2 from './SubmitBug2';

  function SubmitBug() {
    const [input, setInput] = useState({
      title: '',
      description: ''
    })

    function handleChange(event) {
      const {name, value} = event.target ;
    
      setInput(prevInput => {
        return {
          ...prevInput,
          [name]: value
        }
      })
    }

    function handleClick(event) { 
      event.preventDefault();
      console.log(input);
      // input.history.push("/submitbug2")
    }
      return <div className="container">
      <h1>Submit Bug</h1>
      <form>

        <div className="form-group">
          <input onChange={handleChange} name="title" value={input.title} className="form-control" autoComplete="off" placeholder="Title"></input>
        </div>

        <div className="form-group">
        <textarea onChange={handleChange} name="description" value={input.description} className="form-control" autoComplete="off" placeholder="Short description of bug"></textarea>
        </div>

        <button onClick={handleClick} className="btn btn-lg btn-info">Next</button>
      </form>
      </div>
  }
  
  
  export default SubmitBug;
