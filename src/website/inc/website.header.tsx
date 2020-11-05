import React, { useState } from 'react';
import useSize from 'common/hooks/useSize';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Beta } from 'assets/icons/beta.svg';
import { ReactComponent as Cross } from 'assets/icons/cross.svg';
import { ReactComponent as MoneyMinxLogoMobile } from 'assets/icons/money-minx-logo-mobile.svg';

interface LeftMenuType {
  all: string;
  menus: string;
}
const WebsiteHeader = () => {
  const { width } = useSize();
  const { pathname } = useLocation();
  const [expand, setExpand] = useState<keyof LeftMenuType>();

  const handleToggleMenu = () => {
    if (expand) {
      setExpand(undefined);
      return;
    }

    if (width > 605 && width <= 768) {
      setExpand('menus');
    }

    if (width <= 604) {
      setExpand('all');
    }
  };

  const navClass = (label: string) => (pathname.includes(label) ? 'mm-nav-item active' : 'mm-nav-item');

  return (
    <nav className='mm-navbar navbar-expand-lg navbar-light'>
      <div className='logo-btn-wrapper'>
        <Link className='navbar-brand' to='/'>
          <Logo />
        </Link>
        <div className='badge badge-pill badge-primary mm-coming-soon'>Beta</div>
      </div>

      <div className='right-menu-wrapper'>
        <div className={`${expand === 'all' ? 'expand-all' : ''}`}>
          <div className={`menu-btn-wrapper`}>
            <div className={`menu-list-wrapper ${expand === 'menus' ? 'expand-menu' : ''}`}>
              <div className='mm-navbar-logo'>
                <MoneyMinxLogoMobile className='mr-3' />
                <Beta />
              </div>
              <ul className='navbar-nav mr-auto navbar-menu-list'>
                <li className={navClass('pricing')}>
                  <Link className='mm-nav-link' to='/pricing'>
                    Pricing
                  </Link>
                </li>

                <li className={navClass('blog')}>
                  <a
                    className='mm-nav-link'
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.moneyminx.com/blog'
                  >
                    Blog
                  </a>
                </li>
                <li className={navClass('about')}>
                  <Link className='mm-nav-link' to='/about'>
                    About
                  </Link>
                </li>
                <li className={navClass('login')}>
                  <Link className='mm-nav-link' to='login'>
                    Log In
                  </Link>
                </li>
                <li className='mm-nav-item'>
                  <Link className='mm-nav-link' to='/signup'>
                    <button className='w-100 mm-btn-signup btn-outline-primary mm-btn-animate'>Sign Up</button>
                  </Link>
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
