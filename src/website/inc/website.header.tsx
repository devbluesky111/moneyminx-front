import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSize from 'common/hooks/useSize';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';

interface LeftMenuType {
  all: string;
  menus: string;
}
const WebsiteHeader = () => {
  const { width } = useSize();
  const [expand, setExpand] = useState<keyof LeftMenuType>();

  const handleToggleMenu = () => {
    if (expand) {
      setExpand(undefined);
      return;
    }
    if (width > 576 && width <= 768) {
      setExpand('menus');
    }
    if (width <= 575) {
      setExpand('all');
    }
  };

  return (
    <nav className='mm-navbar navbar-expand-lg navbar-light bg-light'>
      <div className='logo-btn-wrapper'>
        <Link className='navbar-brand' to='/'>
          <Logo />
        </Link>
        <div className='mm-label b-primary-light'>Beta</div>
      </div>

      <div className='right-menu-wrapper'>
        <div className={`${expand === 'all' ? 'expand-all' : ''}`}>
          <div className={`menu-btn-wrapper`}>
            <div className={`menu-list-wrapper ${expand === 'menus' ? 'expand-menu' : ''}`}>
              <ul className='navbar-nav mr-auto navbar-menu-list'>
                <li className='mm-nav-item active'>
                  <a className='mm-nav-link' href='/pricing'>
                    Pricing
                  </a>
                </li>

                <li className='mm-nav-item'>
                  <a
                    className='mm-nav-link'
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://velocity.moneyminx.com'
                  >
                    Velocity
                  </a>
                </li>
                <li className='mm-nav-item'>
                  <Link className='mm-nav-link' to='/w/about'>
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className='auth-btn-wrapper mr-1'>
              <ul className='navbar-nav'>
                <li className='mm-nav-item'>
                  <Link className='mm-nav-link' to='/auth/login'>
                    Login
                  </Link>
                </li>
                <li>
                  <a className='mm-nav-link' href='/signup'>
                    <button className='mm-btn-signup btn-outline-primary mm-btn-animate'>Sign Up</button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <button className='navbar-toggler' type='button' onClick={handleToggleMenu}>
        <span className='navbar-toggler-icon' />
      </button>
    </nav>
  );
};

export default WebsiteHeader;
