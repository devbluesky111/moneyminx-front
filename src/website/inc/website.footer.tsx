import React from 'react';
import { ReactComponent as AppStoreLogo } from 'assets/icons/app-store-black.svg';
import { ReactComponent as GooglePlayLogo } from 'assets/icons/google-play-black.svg';

import footerData from '@mm/data/footer.data.json';
import resourceList from '@mm/data/resource.list.json';
import featureList from '@mm/data/feature.list.json';
import companyInfoList from '@mm/data/company-info.list.json';
import SignupToday from 'website/partials/signup-today.footer';

interface ListType {
  title: string;
  list: {
    name: string;
    link: string;
  }[];
}

interface Data {
  data: ListType;
}

const List = ({ data }: Data) => {
  const list = data.list.map((item, idx) => (
    <p key={idx} className='light'>
      {item.name}
    </p>
  ));
  return (
    <div className='list-wrapper py-2'>
      <h5>{data.title}</h5>
      {list}
    </div>
  );
};

const FooterList = () => {
  return (
    <div className='row'>
      <div className='col-md-4'>
        <List data={resourceList} />
      </div>
      <div className='col-md-4'>
        <List data={featureList} />
      </div>
      <div className='col-md-4'>
        <List data={companyInfoList} />
      </div>
    </div>
  );
};

const footerListComponent = <FooterList />;
const WebsiteFooter = () => {
  return (
    <div className='website-footer'>
      <SignupToday />
      <div className='website-footer-wrapper bg-secondary text-white'>
        <div className='footer-hero-wrapper pb-4'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='coming-soon-wrapper'>
                <h1>Coming Soon</h1>
                <p className='light'>
                  Money Minx is currently available online and coming soon to iOS and Android devices.
                </p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='download-btn-wrapper'>
                <AppStoreLogo />
                <GooglePlayLogo className='ml-3' />
              </div>
            </div>
          </div>
        </div>

        <div className='footer-end-section'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='mm-links-wrapper'>{footerListComponent}</div>
            </div>
            <div className='col-lg-6'>
              <div className='info-copy-right-wrapper'>
                <div className='info-wrapper light py-2'>{footerData.moneyminxInfo}</div>
                <div className='social-links-wrapper py-2'>social links here</div>
                <div className='copy-right-wrapper py-2'>{footerData.copyRightText.replace(':year', '2020')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFooter;
