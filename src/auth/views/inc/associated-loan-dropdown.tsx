import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';

import { loanAccounts } from 'auth/auth.types';

interface LoanAccountDropdownProps {
  onChange: (e: React.ChangeEvent<any>, id: any) => void;
  value: number;
  loanAccounts: loanAccounts;
  name: string;
}

const AssociatedLoanDropdown = (props: LoanAccountDropdownProps) => {
  const [show, setShow] = useState(false);
  const { value, onChange, loanAccounts, name } = props;

  let accountName = '';
  for (let i = 0; i < loanAccounts?.length; i++) {
    if (loanAccounts[i].id === value) {
      accountName = loanAccounts[i].accountName;
    }
  }

  return (
    <Dropdown className='drop-box dropdown-select-input' onToggle={(nextShow) => setShow(nextShow)} show={show}>
      <Dropdown.Toggle className='dropdown-toggle'>{accountName}</Dropdown.Toggle>
      <Dropdown.Menu className='mm-dropdown-menu'>
        <ul className='checkbox-list single'>
          <li>
            <label>
              <input
                name={name}
                type='checkbox'
                aria-describedby=''
                aria-checked={!value}
                checked={!value}
                onChange={(e) => {
                  onChange(e, null);
                  setShow(false);
                }}
              />
              <span></span>
            </label>
          </li>
          {loanAccounts?.map((loanAccount, index) => {
            return (
              <li key={index}>
                <label>
                  <input
                    name={name}
                    type='checkbox'
                    aria-describedby={loanAccount.accountName}
                    aria-checked={loanAccount.id === value}
                    checked={loanAccount.id === value}
                    onChange={(e) => {
                      onChange(e, loanAccount.id);
                      setShow(false);
                    }}
                  />
                  <span>{loanAccount.accountName}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AssociatedLoanDropdown;
