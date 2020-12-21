import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';

import { formater } from 'common/common-helper';

interface AccountTypeSelectInputProps {
  args: any[];
  onChange: (e: React.ChangeEvent<any>) => void;
  value: string;
  name: string;
}

const getValue = (val: string) => {
  let fVal = formater(val);
  switch (fVal) {
    case 'Fsa': fVal = 'FSA'; break;
    case 'Ppf': fVal = 'PPF'; break;
    case 'Cd': fVal = 'CD'; break;
  }
  if (fVal.includes(' Isa')) {
    fVal = fVal.replace(' Isa', ' ISA');
  }
  if (fVal.includes(' Ira')) {
    fVal = fVal.replace(' Ira', ' IRA');
  }

  return fVal;
}

export const AccountTypeSelectInput: React.FC<AccountTypeSelectInputProps> = ({ name, args, onChange, value }) => {
  const [show, setShow] = useState(false);

  return (
    <Dropdown className='drop-box dropdown-select-input' onToggle={(nextShow) => setShow(nextShow)} show={show}>
      <Dropdown.Toggle className='dropdown-toggle'>{getValue(value)}</Dropdown.Toggle>
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
                  <span>{getValue(val)}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
