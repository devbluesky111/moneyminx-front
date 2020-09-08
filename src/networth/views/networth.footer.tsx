import React from 'react';
import { Link } from 'react-router-dom';

const NetworthFooter = () => {
  return (
    <footer>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <p>© 2020 Money Minx. All rights reserved.</p>
          </div>
          <div className='col-md-7'>
            <ul className='foot-link'>
              <li>
                <Link to='#'>Privacy Policy</Link>
              </li>
              <li>
                <Link to='#'>Terms of Service</Link>
              </li>
              <li>
                <Link to='#'>Notices</Link>
              </li>
              <li>
                <Link to='#'>Resources</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NetworthFooter;
