import React from 'react';

const AuthFooter = () => {
  return (
    <div className='container-fluid mm-container-final footer-second'>
      <div className='row'>
        <div className='footer-table-wrapper'>
          <div className='footer-content'>
            <div className='copyright-text'>© 2020 Money Minx. All rights reserved.</div>
          </div>
          <div className='footer-content right-content'>
            <ul className='footer-list'>
              <li>
                <a href='link2'>Privacy Policy</a>
              </li>
              <li>
                <a href='link3'>Terms of Service</a>
              </li>
              <li>
                <a href='link4'>Notices</a>
              </li>
              <li>
                <a href='link5'>Resources</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFooter;
