import React from 'react';
import Skeleton from 'react-loading-skeleton';

import NetworthLayout from 'networth/networth.layout';

const NetworthSkeleton = () => {
  return (
    <NetworthLayout>
      <section className='content-container'>
        <div className='app-subheader-container px-4'>
          <Skeleton width={200} height={50} count={1} />
        </div>
        <hr className='m-0' />
        <div className='content-wrapper'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 dropdowns-container'>
                <div className='dflex-center mb-15'>
                  <Skeleton width={265} height={50} count={3} />
                </div>
              </div>
            </div>
            <div className='row mb-40'>
              <div className='col-lg-9 mob-btm'>
                <Skeleton width={950} height={400} />
              </div>
              <div className='col-lg-3 mob-btm'>
                <Skeleton width={300} height={400} />
              </div>
            </div>
            <div className='row mb-40'>
              <div className='col-12'>
                <Skeleton width={1276} height={400} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </NetworthLayout>
  );
};

export default NetworthSkeleton;
