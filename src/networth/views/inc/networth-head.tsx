import React from 'react';
import AppSubHeader from '../../../common/app.sub-header';

const NetworthHead = () => {  

  return (
    <div className='content-head'>
      <div className='container'>
        <AppSubHeader/>

        {/*<div className='right-box'>
          <button type='button' className='download-btn'>
            <DownloadExcel />
            <span className='sm-hide'>Download</span> <span>CSV</span>
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default NetworthHead;
