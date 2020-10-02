import React from 'react';

interface SaveSettingProps {
  handleSave: (args: any) => void;
}
const SaveSettings: React.FC<SaveSettingProps> = ({ handleSave }) => {
  return (
    <div className='action-overlay'>
      <button type='button' className='btn btn-primary btn-lg mm-button' onClick={handleSave}>
        Save changes
      </button>
    </div>
  );
};

export default SaveSettings;
