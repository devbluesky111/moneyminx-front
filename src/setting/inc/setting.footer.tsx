import React from 'react';
import { Link } from 'react-router-dom';
import footerData from '@mm/data/footer.data.json';

export const FooterSection = () => {
  return (
    <div className='mm-setting-footer'>
      <div className='mm-setting-footer--block'>
        <div>{footerData.copyrightText.replace(':year', '2020')}</div>
        <div>
          <ul className='mm-setting-footer--list'>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li> 
            <li>
              <Link to="#">Terms of Service</Link>
            </li>
            <li>
              <Link to="#">Notices</Link>
            </li>
            <li>
              <Link to="#">Resources</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
