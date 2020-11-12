import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';

interface MMSelectProps {
  title: string;
}

const MMSelect: React.FC<MMSelectProps> = ({ children, title }) => {
  return (
    <Dropdown className='drop-box'>
      <Dropdown.Toggle className='dropdown-toggle'>{title}</Dropdown.Toggle>
      <Dropdown.Menu className='mm-dropdown-menu'>{children}</Dropdown.Menu>
    </Dropdown>
  );
};

export default MMSelect;
