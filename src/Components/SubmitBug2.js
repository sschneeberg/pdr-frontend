
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import axios from "axios";





  function SubmitBug2() {
    const [input, setInput] = useState({
      title: '',
      company: '',
      product: '',
      picture: '',      
      description: '',
      createdBy: '',
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
      console.log(input)

      // const newTicket = {
      //   title: input.title,
      //   company: input.company,
      //   product: input.product,
      //   picture: input.picture,      
      //   description: input.description,
      //   createdBy: input.createdBy,
      // }
      // axios.post('http://localhost:8000/', newTicket)
    }
      return <div className="container">
      <h1>Submit Bug</h1>
      <form>

        <div className="form-group">
          <input onChange={handleChange} name="title" value={input.title} className="form-control" autoComplete="off" placeholder="Title"></input>
        </div>

        <div className="form-group">
        <label>
          List your Company:
          <select value={input.company} onChange={handleChange}>
            <option value="Facebook">Facebook</option>
            <option value="Youtube">Youtube</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </label>
        </div>

        <div className="form-group">
        <textarea onChange={handleChange} name="product" value={input.product} className="form-control" autoComplete="off" placeholder="Name of product."></textarea>
        </div>

        <div className="form-group">
        <textarea onChange={handleChange} name="description" value={input.description} className="form-control" autoComplete="off" placeholder="Short description of bug"></textarea>
        </div>

        <div className="form-group">
        <input type="file" name="fileToUpload" id="fileToUpload" onChange={handleChange} name="picture" value={input.picture}></input>
        </div>

        <div className="form-group">
        <textarea onChange={handleChange} name="createdBy" value={input.createdBy} className="form-control" autoComplete="off" placeholder="Created By..."></textarea>
        </div>

        <button onClick={handleClick} className="btn btn-lg btn-info">Next</button>
      </form>
      </div>
  }
  
  
  export default SubmitBug2;




// import React from 'react';

// function SubmitBug2(props) {

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     props.history.push('/login')
// }
//   const onSubmitHandlerTy = (e) => {
//     e.preventDefault();
//     props.history.push('/formsubmitted')
// }

//     return (
//       <div>
//         <h1>Bug Submit Form</h1>
//         <form action="">
//             <label HTMLfor="text">Description</label>
//             <input type="text" name="description" id="" />
//             <br />
//             <label HTMLfor="text">Image</label>
//             <input type="text" name="image" id="" />
//             <br />
//             <label HTMLfor="text">Company</label>
//             <input type="text" name="company" id="" />
//             <br />
//             <label HTMLfor="text">Product</label>
//             <input type="text" name="product" id="" />
//             <br />
//             <input type="submit" name="" id="" value='Login/Signup and submit' onClick={onSubmitHandler} />
//             <input type="submit" name="" id="" value='Submit as guest' onClick={onSubmitHandlerTy}  />
//         </form>
//         <div>If you would like feedback on your submission, sign up for an account
//         </div>
//       </div>
//     )
//   }
  
//   export default SubmitBug2;