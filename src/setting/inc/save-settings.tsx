import React from 'react';

interface SaveSettingProps {
  handleSave: (args: any) => void;
}
const SaveSettings: React.FC<SaveSettingProps> = ({ handleSave }) => {
  return (
    <div className='card mm-setting-card bottom-fixed'>
      <div className='card-body text-right'>
        <button type='button' className='btn btn-primary btn-lg mm-button' onClick={handleSave}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default SaveSettings;
