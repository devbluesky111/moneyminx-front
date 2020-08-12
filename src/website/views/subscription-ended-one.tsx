import React from 'react';
import WebsiteLayout from 'website/website.layout';
import { ReactComponent as PricingTickIcon } from 'assets/images/pricing/tick-icon.svg';
import { ReactComponent as PricingPieChart } from 'assets/images/pricing/pricing-pie-chart.svg';
import { ReactComponent as SubscriptionWarning } from 'assets/images/subscription/warning.svg';
const SubscriptionEnded = () => {
  return (
    <WebsiteLayout>
      <SubscriptionEndedTopSection />
      <PricingTable />
    </WebsiteLayout>
  );
};
export default SubscriptionEnded;
export const SubscriptionEndedTopSection = () => {
  return (
    <div className='mm-container-right pricing-banner-container'>
      <div className='row pricing-top'>
        <div className='col-lg-5'>
          <div className='pricing-left-banner'>
            <h1>
              <span className='block'>Early adopter </span>pricing (25% off)
            </h1>
            <p className='text'>
              No credit card needed, sign up now and use Money <span className='block'>Minx free for 30 days.</span>
            </p>

            <button className='mm-btn-animate bg-primary mm-btn-primary-outline'>Get Started</button>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-lg-7 pricing-chart-wrapper'>
          <div className='banner-piechart'>
            <PricingPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PricingTable = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='subs-ended-msg-box'>
          <div className='subs-ended-left'>
            <h4>Uh oh. Your subscription ended!</h4>
            <p>To continue using Money Minx please choose from one of the plans below to continue.</p>
          </div>
          <span className='warning-icon'>
            <SubscriptionWarning />
          </span>
        </div>
      </div>
      <div className='row'>
        <div className='plan-section'>
          <button className='mm-btn-animate plan-btn text-primary ml-3 btn-xs-block'>Monthly</button>
          <button className='mm-btn-animate plan-btn text-primary ml-3 btn-xs-block annually'>
            <span className='save-text'>Annually</span>
          </button>
        </div>
      </div>

      <div className='row'>
        <div className='pricing-table-wrapper'>
          <div className='price-table'>
            <div className='price-heading'>
              <h2>Early Adopter - VIP</h2>
              <p>$74 / month</p>
            </div>
            <ul className='features-list'>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Unlimited connected accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Unlimited manual accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Current and historical asset allocation charts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Sync across as many devices as you need
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early Adopter badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                VIP badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                New features as being developed
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to founders
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to request new features for consideration
              </li>
            </ul>
            <button className='mm-btn-animate trial-btn bg-white text-primary ml-3 btn-xs-block'>
              Start 30 day trial
            </button>
          </div>
          <div className='price-table'>
            <div className='price-heading second-table'>
              <h2>Early Adopter - Pro</h2>
              <p>$22 / month</p>
            </div>
            <ul className='features-list'>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                30 connected accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                30 manual accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Current and last 12 months asset allocation charts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Sync across as many devices as you need
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early Adopter badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Pro badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                New features as being developed
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to founders
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to request new features for consideration
              </li>
            </ul>
            <button className='mm-btn-animate trial-btn bg-white text-primary ml-3 btn-xs-block'>
              Start 30 day trial
            </button>
          </div>
          <div className='price-table'>
            <div className='price-heading'>
              <h2>Early Adopter - Plus</h2>
              <p>$14 / month</p>
            </div>
            <ul className='features-list'>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                10 connected accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                10 manual accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Current and last 6 months asset allocation charts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Sync across as many devices as you need
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early Adopter badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Plus badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                New features as being developed
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to founders
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to request new features for consideration
              </li>
            </ul>
            <button className='mm-btn-animate trial-btn bg-white text-primary ml-3 btn-xs-block'>
              Start 30 day trial
            </button>
          </div>
          <div className='price-table'>
            <div className='price-heading'>
              <h2>Early Adopter - Green</h2>
              <p>$7 / month</p>
            </div>
            <ul className='features-list'>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                5 connected accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                5 manual accounts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Current and last 3 months asset allocation charts
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Sync across as many devices as you need
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early Adopter badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Green badge
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                New features as being developed
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to founders
              </li>
              <li>
                <div className='tick-icon'>
                  <PricingTickIcon />
                </div>
                Early adopter access to request new features for consideration
              </li>
            </ul>
            <button className='mm-btn-animate trial-btn bg-white text-primary ml-3 btn-xs-block'>
              Start 30 day trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
