import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ChartSkeleton = () => {
  return (
    <div className='account-chart-skeleton-wrapper'>
      <Skeleton width={20} height={306} count={12} />
    </div>
  );
};

export default ChartSkeleton;
