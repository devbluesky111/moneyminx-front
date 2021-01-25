import React from 'react';
import Skeleton from 'react-loading-skeleton';

const AccountSkeleton = () => {
  return (
    <div className='content-wrapper'>
      <div className='container'>
        <div className='mm-account'>
          <div className='mm-account__selection mb-3'>
            <Skeleton width={200} height={50} count={1} />
          </div>
          <div className='mb-40'>
            <Skeleton width={1232} height={450} />
          </div>
          <div className='d-flex justify-content-between flex-wrap'>
            <div className='mm-plan-radios mb-4'>
              <Skeleton width={200} height={50} count={1} />
            </div>
          </div>
          <Skeleton width={1232} height={250} />
        </div>
      </div>
    </div>
  );
};

export default AccountSkeleton;
