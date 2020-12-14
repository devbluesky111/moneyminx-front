import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';
import AllocationMain from 'assets/images/home/allocation-pie-chart.svg';
import AllocationHistoryImg from 'assets/images/features/allocation-history.svg';
import AllocationSharingImg from 'assets/images/features/share-asset-allocation.svg';

const FeaturesAllocations = () => {
  return (
    <WebsiteLayout>
      <Helmet>
        <title>Asset Allocation | Money Minx</title>
      </Helmet>
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
          <div>
            <h1>Asset Allocation</h1>
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
            <img src={AllocationMain} alt={'Asset Allocation Chart'} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesAllocationsBottomSection = () => {
  return (
    <section className='feature-section feature-section-reversed'>
      <div className='row'>
        <div className='col-lg-7 feature-image'>
          <img src={AllocationHistoryImg} alt={'Historical Asset Allocation'}/>
        </div>
        <div className='col-lg-5 feature-content'>
          <h2>Allocation History</h2>
          <p>
            Go back through history and see how your asset allocation chart has changed with time.
          </p>
          <p>
            You can also review past allocations and compare it to the performance of your account to determine what is the right allocation for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export const FeaturesAllocationsSharing = () => {
  return (
    <section className='feature-section feature-text-left'>
      <div className='row'>
        <div className='col-lg-5 feature-content'>
          <h2>Sharable Asset Allocation Card</h2>
          <p>
            With a click of a button, Money Minx will create a beautiful asset allocation chart ready for sharing.
            You can download the asset allocation card or post is to Facebook, Twitter or Pinterest straight from Money Minx.
          </p>
        </div>
        <div className='col-lg-7 feature-image'>
          <img src={AllocationSharingImg} alt={'Share Asset Allocation'} />
        </div>
      </div>
    </section>
  );
};
