import React from 'react';

function SubmitBug2(props) {

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.history.push('/login')
}
  const onSubmitHandlerTy = (e) => {
    e.preventDefault();
    props.history.push('/formsubmitted')
}

    return (
      <div>
        <h1>Bug Submit Form</h1>
        <form action="">
            <label for="text">Description</label>
            <input type="text" name="description" id="" />
            <br />
            <label for="text">Image</label>
            <input type="text" name="image" id="" />
            <br />
            <label for="text">Company</label>
            <input type="text" name="company" id="" />
            <br />
            <label for="text">Product</label>
            <input type="text" name="product" id="" />
            <br />
            <input type="submit" name="" id="" value='Login/Signup and submit' onClick={onSubmitHandler} />
            <input type="submit" name="" id="" value='Submit as guest' onClick={onSubmitHandlerTy}  />
        </form>
        <div>If you would like feedback on your submission, sign up for an account
        </div>
      </div>
    )
  }
  
  export default SubmitBug2;