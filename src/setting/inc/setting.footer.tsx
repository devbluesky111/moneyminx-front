import React from 'react';
import footerData from '@mm/data/footer.data.json';

export const FooterSection = () => {
  return (
    <div className='mm-setting-footer'>
      <div className='mm-setting-footer--block'>
        <div>{footerData.copyRightText.replace(':year', '2020')}</div>
        <div>
          <ul className='mm-setting-footer--list'>
            <li>
              <a href='#'>Privacy Policy</a>
            </li>
            <li>
              <a href='#'>Terms of Service</a>
            </li>
            <li>
              <a href='#'>Notices</a>
            </li>
            <li>
              <a href='#'>Resources</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
