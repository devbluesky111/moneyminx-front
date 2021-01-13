import React from 'react';

import { ReactComponent as Spinner } from 'assets/icons/spinner.svg';

import { ButtonProps } from '../component.type';

const SubmitButton: React.FC<ButtonProps> = ({ disabled = false, loading = false, text }) => {
  return (
    <button type='submit' className='btn btn-primary btn-block mt-4' disabled={disabled}>
      {loading && <Spinner style={{ width: 40, height: 40, color: 'red' }} />}
      {text}
    </button>
  );
};

export default SubmitButton;
