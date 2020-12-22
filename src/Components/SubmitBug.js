import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SubmitBug(props) {

  const onSubmitHandler = (e) => {
      e.preventDefault();
      props.history.push('/sbpt2')
  }

    return (
      <div>
        <h1>Bug Submit Form</h1>
        <form action="">
          <label htmlFor="text">image</label>
          <input type="text" placeholder='Image submit' />
          <input type="submit" name="" id="" onClick={onSubmitHandler} />
        </form>
        <form action="">
          <label htmlFor="text">text</label>
          <input type="text" placeholder='Text submit' />
          <label htmlFor="text">text</label>
          <input type="text" placeholder='Text submit' />
          <input type="submit" name="" id="" onClick={onSubmitHandler}/>
        </form>
      </div>
    )
  }
  
  export default SubmitBug;
