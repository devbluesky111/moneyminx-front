import React from 'react';
import WebsiteLayout from 'website/website.layout';
import OwnerOneImg from 'assets/images/about/hussein.png';
import OwnerTwoImg from 'assets/images/about/jessica.png';
import OwnerLeftImg from 'assets/images/about/owner-left-img.png';
import PeerStreetLogo from 'assets/images/subscription/peerstreetlogo.png';
import { ReactComponent as AboutSwitchIcon } from 'assets/images/about/switch.svg';
import { ReactComponent as AboutNetWorthChart } from 'assets/images/about/networth.svg';
import { ReactComponent as AboutWealthFrontIcon } from 'assets/images/about/wealthfront.svg';
import { ReactComponent as OwnerTwitterIcon } from 'assets/images/about/owner-twitter-icon.svg';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <WebsiteLayout>
      <AboutTopSection />
      <AboutOwnerSection />
      <AboutNetWorthSection />
    </WebsiteLayout>
  );
};
export default About;
export const AboutTopSection = () => {
  return (
    <div className='mm-container-right about-banner-container'>
      <div className='row about-top'>
        <div className='col-lg-7 mb-5 p-md-5'>
          <div className='about-left-banner'>
            <h1>About Money Minx</h1>
            <p className='text'>
              Money Minx makes (professional-level) investment tracking and portfolio visualizer tools accessible to
              investors of all wealth levels, including those just getting started.{' '}
            </p>
            <p className='text'>
              With a focus on modern technology, beautiful design and a friendly, intuitive user experience, Money
              Minx’s mission is to empower people of all walks life to be more informed, confident and successful in
              building and diversifying their portfolios.{' '}
            </p>
            <p className='text'>
              By developing wealth-building tools that are traditionally available to professional investors and the
              ultra wealthy, Money Minx aims to transform the way every day investors track and see their investments -
              and in turn plan for bright futures.
            </p>
            <Link to='/signup'>
              <button className='mm-btn-animate bg-primary mm-btn-primary-outline'>Get Started</button>
            </Link>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-lg-5 pricing-chart-wrapper pl-md-5'>
          <div className='about-right-banner'>
            <div className='account-wrap bg-white top-box'>
              <h3>Connected Accounts (3/3)</h3>
              <p>Upgrade your account to add more connections</p>
            </div>

            <div className='account-wrap bg-white border'>
              <h2>
                <span className='logo-icon'>
                  <AboutWealthFrontIcon />
                </span>
                Wealthfront
              </h2>
              <ul className='account-list'>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />{' '}
                  </span>
                  Account 01
                </li>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />
                  </span>{' '}
                  Account 02
                </li>
              </ul>
            </div>
            <div className='account-wrap bg-white border small-box'>
              <h2>
                <span className='logo-icon'>
                  <img alt='Peer Street' src={PeerStreetLogo} />
                </span>
                Peer Street
              </h2>
              <ul className='account-list'>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />{' '}
                  </span>
                  Account 01
                </li>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />
                  </span>{' '}
                  Account 02
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutOwnerSection = () => {
  return (
    <div className='mm-container-right owner-section bg-white p-md-5'>
      <div className='row'>
        <div className='col-lg-5 mm-owner-section-img'>
          <div className='left-owner-img'>
            <img alt='OWNER IMG' src={OwnerLeftImg} />
          </div>
        </div>
        <div className='col-lg-7 mm-owner-section-info'>
          <div className='owner-info'>
            <h1>Meet our Founders</h1>
            <p className='text'>
              Money Minx was started by Hussein and Jessica, a husband/wife team and investors from Southern California.
            </p>
            <p className='text'>
              Hussein is a veteran technologist with time as CIO for multiple financial service companies. Jessica is a
              market research and communications pro who loves to work for start-ups. As we expanded our investments
              outside of 401K, IRAs and the stock market, we needed a way to track it all in one place. Like most
              investors, we used Excel…but we knew there should be a better way. Something user-friendly, accessible and
              nice to look at - something like Money Minx. We hope our tools help you grow and diversify your portfolio.
              Be invested!
            </p>
            <ul className='owner-list'>
              <li>
                <img alt='Owner' src={OwnerOneImg} />
                <h2>Hussein</h2>
                <p>
                  <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                    @husseinyahfoufi
                    <span className='twitter-icon'>
                      <OwnerTwitterIcon />
                    </span>
                  </a>
                </p>
              </li>
              <li>
                <img alt='Owner' src={OwnerTwoImg} />
                <h2>Jessica</h2>
                <p>
                  <a href='http://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                    @jessicayahfoufi
                    <span className='twitter-icon'>
                      <OwnerTwitterIcon />
                    </span>
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutNetWorthSection = () => {
  return (
    <div className='mm-container-right networth-section pt-0 p-md-5'>
      <div className='row'>
        <div className='col-lg-5'>
          <div className='networth-text'>
            <p>
              <span className='highlighted-text'>One of our many features</span>
            </p>
            <h1>Net Worth</h1>
            <p className='text'>
              Stock shares which make up the stock portfolio of an individual or firm. Other types of investments, if
              held, are also holdings.
            </p>
          </div>
        </div>
        <div className='col-lg-7'>
          <div className='networth-chart'>
            <AboutNetWorthChart />
          </div>
          <div className='mm-chart-index mm-mobile-hide'>
            <ul>
              <li><div className="mm-square mm-square-1"></div><div className='mm-square-text'>Investment Assets</div><span className='d-block mm-square-amt'>$235,000</span></li>
              <li><div className="mm-square mm-square-2"></div><div className='mm-square-text'>Other Assets</div><span className='d-block mm-square-amt'>$735,000</span></li>
              <li><div className="mm-square mm-square-3"></div><div className='mm-square-text'>Liabilities</div><span className='d-block mm-square-amt'>$1,505,000</span></li>
              <li><div className="mm-square mm-square-4"></div><div className='mm-square-text'>Net Worth</div><span className='d-block mm-square-amt mb-n3'>$535,000</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
