import React from 'react';
import { AllocationProps } from '../allocation.type';
import AllocationOverview from './allocation-overview';
import NavBarSection from '../../setting/inc/setting.header';
import FooterSection from '../../setting/inc/setting.footer';
import AllocationSubNavigation from './allocation-sub-navigation';

const Allocation: React.FC<AllocationProps> = () => {
  return (
    <div className='mm-setting mm-allocation'>
      <NavBarSection />
      <AllocationSubNavigation />
      <AllocationOverview />
      <FooterSection />
    </div>
  );
};

export default Allocation;
