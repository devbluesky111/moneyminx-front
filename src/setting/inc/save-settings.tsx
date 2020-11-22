import React from 'react';

interface SaveSettingProps {
  handleSave: (args: any) => void;
  status?: boolean
}

const SaveSettings: React.FC<SaveSettingProps> = ({ handleSave, status= false }) => {
  return (
    <div className='action-overlay'>
      <button type='button' className='btn btn-primary btn-lg mm-button float-right' onClick={handleSave}>
        {status && <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'/>}
        <span className={'ml-1'}> {status ? 'Saving...' : 'Save changes'}</span>
      </button>
    </div>
  );
};

export default SaveSettings;
