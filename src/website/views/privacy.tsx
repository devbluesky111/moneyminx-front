import React from 'react';
import WebsiteLayout from 'website/website.layout';
import privacyData from '@mm/data/privacy.json';

const { privacy } = privacyData;

const privacyContentSection = () => {
  const privacyContent = privacy.data.map((d, i) => {
    return (
      <div key={i}>
        <h3 className='notice-content-title'>{d.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: d.content }} />
      </div>
    );
  });
  return <>{privacyContent}</>;
};

const Privacy = () => {
  return (
    <WebsiteLayout>
      <div className='notice-wrapper'>
        <div className='notice-header'>
          <h1>{privacy.title}</h1>
          <h6>{privacy.subTitle}</h6>
          <p>{privacy.update}</p>
          <div dangerouslySetInnerHTML={{ __html: privacy.info }} />
        </div>
        {privacyContentSection()}
      </div>
    </WebsiteLayout>
  );
};

export default Privacy;
