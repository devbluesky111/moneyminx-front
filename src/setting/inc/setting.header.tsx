import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import OwnerOneImg from 'assets/images/about/hussein.png';
import { ReactComponent as ProBadage } from 'assets/images/about/pro-badage.svg';

export const NavBarSection = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mm-setting-navbar'>
      <Link className='navbar-brand' to='/'>
        <Logo />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavDropdown'
        aria-controls='navbarNavDropdown'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavDropdown'>
        <ul className='navbar-nav mm-setting-nav'>
          <div className='d-flex align-items-center'>
            <li className='nav-item mm-setting-nav--item'>
              <a className='nav-link' href='#'>
                Net Worth <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Allocation
              </a>
            </li>
          </div>
          <div className='d-flex align-items-center'>
            <li className='mr-4'>
              <button type='button' className='btn btn-outline-primary custom-dot-btn'>
                Upgrade
              </button>
            </li>
            <div className='mt-vl'></div>
            <li className='mr-1'>
              <ProBadage />
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <img alt='Owner' src={OwnerOneImg} className='rounded-circle mr-2' width='38' height='38' />
                Hussein
              </a>
              <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                <a className='dropdown-item' href='#'>
                  Action
                </a>
                <a className='dropdown-item' href='#'>
                  Another action
                </a>
                <a className='dropdown-item' href='#'>
                  Something else here
                </a>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarSection;
