import React from 'react';

function SubmitBug(props) {

  const onSubmitHandler = (e) => {
      e.preventDefault();
      
  }

    return (
      <div>
        <h1>Bug Submit Form</h1>
        <form action="">
          <label for="text">image</label>
          <input type="text" placeholder='Image submit' />
          <input type="submit" name="" id="" />
        </form>
        <form action="">
          <label for="text">text</label>
          <input type="text" placeholder='Text submit' />
          <label for="text">text</label>
          <input type="text" placeholder='Text submit' />
          <input type="submit" name="" id="" onClick={onSubmitHandler}/>
        </form>
      </div>
    )
  }
  
  export default SubmitBug;
