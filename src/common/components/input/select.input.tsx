import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';

import { foramtHoldingType } from 'account/views/holdings-details.modal';
import { formater } from 'common/common-helper';

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

interface SelectInputProps {
  args: any[];
  onChange: (e: React.ChangeEvent<any>) => void;
  value: string;
  name: string;
  isHoldingTypes?: boolean;
  format?: boolean
}

export const SelectInput: React.FC<SelectInputProps> = ({ name, args, onChange, value, isHoldingTypes, format }) => {
  const [show, setShow] = useState(false);

  return (
    <Dropdown className='drop-box dropdown-select-input' onToggle={(nextShow) => setShow(nextShow)} show={show}>
      <Dropdown.Toggle className='dropdown-toggle'>{formater(value)}</Dropdown.Toggle>
      <Dropdown.Menu className='mm-dropdown-menu'>
        <ul className='checkbox-list'>
          {args?.map((val, index) => {
            return (
              <li key={index}>
                <label>
                  <input
                    name={name}
                    type='checkbox'
                    aria-describedby={val}
                    value={val}
                    aria-checked={val === value}
                    checked={val === value}
                    onChange={(e) => {
                      onChange(e);
                      setShow(false);
                    }}
                  />
                  <span>{isHoldingTypes ? foramtHoldingType(val) : format ? formater(val) : val}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
