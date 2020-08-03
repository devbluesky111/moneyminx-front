import React from 'react';

const SignupToday = () => {
  return (
    <div className='mm-container signup-today-wrapper bg-primary text-white'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='text-wrapper'>
            <h1>Sign Up today</h1>
            <p>
              Asset allocation, performance tracking, and more. Discover the effortless way to stay on top of your
              investments.
            </p>
          </div>
        </div>
        <div className='col-lg-6 d-flex flex-lg-row flex-md-column align-items-center'>
          <div className='btn-wrapper '>
            <button className='mm-btn-animate mm-btn-primary-outline'>Compare Plans</button>
            <button className='mm-btn-animate bg-white text-primary ml-3'>Sign Up Free</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupToday;
