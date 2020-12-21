import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';

import { foramtHoldingType } from 'account/views/holdings-details.modal';

interface HoldingTypeSelectInputProps {
  args: any[];
  onChange: (e: React.ChangeEvent<any>) => void;
  value: string;
  name: string;
}

export const HoldingTypeSelectInput: React.FC<HoldingTypeSelectInputProps> = ({ name, args, onChange, value }) => {
  const [show, setShow] = useState(false);

  for (let i = 0; i < args.length; i++) {
    if (args[i] === 'CD' || args[i] === 'ETF' || args[i] === 'ETN' || args[i] === 'REMIC') {
      args[i] = args[i].toLowerCase();
    }
  }

  return (
    <Dropdown className='drop-box dropdown-select-input' onToggle={(nextShow) => setShow(nextShow)} show={show}>
      <Dropdown.Toggle className='dropdown-toggle'>{foramtHoldingType(value)}</Dropdown.Toggle>
      <Dropdown.Menu className='mm-dropdown-menu'>
        <ul className='checkbox-list single'>
          {args.sort()?.map((val, index) => {
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
                  <span>{foramtHoldingType(val)}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
