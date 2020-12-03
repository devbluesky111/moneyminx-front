import React from 'react';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';

import { ReactComponent as AboutNetWorthChart } from 'assets/images/about/networth.svg';
import { ReactComponent as AllocationMain } from 'assets/images/home/allocation-pie-chart.svg';
import { ReactComponent as PerformanceLegend } from 'assets/images/home/performance-legend.svg';
import { ReactComponent as HomeNetWorthProjections } from 'assets/images/home/net-worth-projections.svg';

const FeaturesAllocations = () => {
  return (
    <WebsiteLayout>
      <div className='mm-new-container'>
        <FeaturesAllocationsTopSection />
        <FeaturesAllocationsBottomSection />
        <FeaturesAllocationsSharing />
      </div>
    </WebsiteLayout>
  );
};
export default FeaturesAllocations;

export const FeaturesAllocationsTopSection = () => {
  return (
    <section>
      <div className='row mm-about-top-section'>
        <div className='col-12 col-xl-7'>
          <div className=''>
            <h1>Asset Allocations</h1>
            <div className='p-b-10'>
              <p className='text'>
                Keep your asset allocation up to date with little effort needed. Change your allocation to view it by type, class, risk or country.
                No more tedious Google Sheets updates to figure out what your current allocation is.
              </p>
              <p className='text'>
                Knowing how your portfolio is currently allocated is key to having a well diversified portfolio.
                Spend more time planning for your next investment or re-balancing and less time doing data entry.
              </p>
            </div>
            <Link to='/signup'>
              <button className='mm-btn-animate mm-btn-primary'>Get Started</button>
            </Link>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-12 col-xl-5'>
          <div className='mm-about-right-banner'>
            <AllocationMain />
            <PerformanceLegend className='mm-networth-chart-legend mt-3' />
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesAllocationsBottomSection = () => {
  return (
    <section>
      <div className='row'>
      <div className='col-xl-5'>
        <div className='networth-text'>
          <h2>Allocation History</h2>
          <p className='text'>
            Depending on your plan level you will have access to the past 6 months, 12 months or all historical allocation charts.
            This will allow you to review how your account was set up before or after a large swing in the market.
          </p>
          <p className='text'>
            You can also review past allocations and compare it to the performance of your account to determine what is the right allocation for you.
          </p>
        </div>
      </div>
      <div className='col-xl-7'>
        <div className='mm-networth-chart text-center'>
          <AboutNetWorthChart className='mm-about-net-worth-chart' />
        </div>
      </div>
    </div>
    </section>
  );
};
export const FeaturesAllocationsSharing = () => {
  return (
    <section>
      <div className='mm-home-performance-section networth-section rtl'>
        <div className='row'>
          <div className='col-xl-5'>
            <div className='networth-text'>
              <h2>Sharable Asset Allocation Card</h2>
              <p className='text'>
                With a click of a button, Money Minx will create a beautiful asset allocation chart ready for sharing.
                You can download the asset allocation card or post is to Facebook, Twitter or Pinterest straight from Money Minx.
              </p>
            </div>
          </div>
          <div className='col-xl-7'>
            <div className='mm-home-performance-section-chart'>
              <HomeNetWorthProjections />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
