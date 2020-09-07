import React from 'react';

const InlineToast = () => {
  return (
    <div className='toast warning-toast' data-autohide='false' role='alert' aria-live='assertive' aria-atomic='true'>
      <div className='toast-body'>2 connections need attention</div>
      <span data-dismiss='toast'>X</span>
    </div>
  );
};

export default InlineToast;
