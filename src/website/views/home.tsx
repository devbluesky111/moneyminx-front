// tslint:disable: react-a11y-accessible-headings

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import WebsiteLayout from 'website/website.layout';
import { fetchBlogs } from 'website/website.service';
import { appRouteConstants } from 'app/app-route.constant';

import HomeBlogImgOne from 'assets/images/home/home-blog-img1.png';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as FeatureIconOne } from 'assets/images/home/feature-icon1.svg';
import { ReactComponent as FeatureIconTwo } from 'assets/images/home/feature-icon2.svg';
import { ReactComponent as FeatureIconSix } from 'assets/images/home/feature-icon6.svg';
import { ReactComponent as HomeBannerImg } from 'assets/images/home/home-banner-img.svg';
import { ReactComponent as HomeMinxMeasure } from 'assets/images/home/measure-chart.svg';
import { ReactComponent as FeatureIconFour } from 'assets/images/home/feature-icon4.svg';
import { ReactComponent as FeatureIconFive } from 'assets/images/home/feature-icon5.svg';
import { ReactComponent as HomeMinxwinksImg } from 'assets/images/home/minxwinks-img.svg';
import { ReactComponent as FeatureIconThree } from 'assets/images/home/feature-icon3.svg';
import { ReactComponent as HomeNetWorthChart } from 'assets/images/home/home-networth.svg';
import { ReactComponent as HomeScrollDown } from 'assets/images/home/scroll-down-icon.svg';
import { ReactComponent as HomeEarlyAdapter } from 'assets/images/home/early-adapter-icon.svg';
import { ReactComponent as HomePerformanceChart } from 'assets/images/home/performance-chart.svg';
import { ReactComponent as HomeAllocationChart } from 'assets/images/home/allocation-pie-chart.svg';

const Home = () => {
  return (
    <WebsiteLayout>
      <HomeTopSection />
      <HomeEarlyAdopterSection />
      <HomeFeatureSection />
      <HomeBlogSection />
      <HomeNetWorthSection />
      <HomeAllocationSection />
      <HomePerformanceSection />
      <MinxWinksSection />
      <MinxMeasureSection />
    </WebsiteLayout>
  );
};

export default Home;
export const HomeTopSection = () => {
  return (
    <div className='mm-container-right home-banner-container'>
      <div className='row home-top'>
        <div className='col-lg-7'>
          <div className='home-left-banner'>
            <h1>The easiest way to track all of your investments, in one place</h1>
            <p className='text'>
              Track your stocks, bonds, mutual funds, alternatives and much more all in one simple, accessible
              dashboard.
            </p>

            <Link to={appRouteConstants.auth.SIGNUP}>
              <button className='mm-btn-animate bg-primary mm-btn-primary-outline'>Get Started</button>
            </Link>
            <p className='info-text'>No credit card needed.</p>
            <div className='scroll-down-btn'>
              <a href='link'>
                <HomeScrollDown />
              </a>
            </div>
          </div>
        </div>
        <div className='col-lg-5'>
          <div className='home-banner-right'>
            <HomeBannerImg />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeEarlyAdopterSection = () => {
  return (
    <div className='mm-container-right early-adapter-section'>
      <div className='row home-top'>
        <div className='col-lg-12 home-list'>
          <div className='adopter-top-wrap'>
            <h1>Early Adopter Perks</h1>
            <p>Money Minx early adopters get these awesome perks. Only available while we are in Beta.</p>
          </div>
          <ul className='earlyadopter-list'>
            <li className='bg-white'>
              <div className='adopter-content'>
                <h2>25% Discount on all plans</h2>
                <p>Get 25% off for the life of your account even after we go live!</p>
              </div>
            </li>
            <li className='bg-white'>
              <div className='adopter-content'>
                <div className='early-adapter-tag'>
                  <span>
                    <HomeEarlyAdapter />
                  </span>
                </div>
                <h2>Early Adopter profile badge</h2>
                <p>
                  Get an early adopter badge that will go up in the community once we go live. This badge will never be
                  available again.
                </p>
              </div>
            </li>
            <li className='bg-white'>
              <div className='adopter-content'>
                <h2>Get insights before anyone else</h2>
                <p>Know about new features before others and help us drive the development of new features.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export const HomeFeatureSection = () => {
  return (
    <div className='mm-container-right home-feature-section'>
      <div className='row'>
        <div className='col-lg-12 home-list home-feature-list'>
          <ul>
            <li>
              <div className='feature-content'>
                <div className='feature-icon'>
                  <FeatureIconOne />
                </div>
                <h2>Asset Allocation</h2>
                <p>Simple, up-to-date and shareable asset allocation charts</p>
              </div>
            </li>
            <li>
              <div className='feature-content'>
                <div className='feature-icon'>
                  <FeatureIconTwo />
                </div>
                <h2>Net Worth</h2>
                <p>Ready to view networth summary categories by investments, assets and liabilities</p>
              </div>
            </li>
            <li>
              <div className='feature-content'>
                <div className='feature-icon'>
                  <FeatureIconThree />
                </div>
                <h2>Account Details</h2>
                <p>View the details behind each account in one place.</p>
              </div>
            </li>

            <li>
              <div className='feature-content'>
                <div className='feature-icon'>
                  <FeatureIconFour />
                </div>
                <h2>Synced Automatically</h2>
                <p>We sync directly with your banks and brokerages to keep your information up to date.</p>
              </div>
            </li>
            <li>
              <div className='feature-content'>
                <div className='feature-icon'>
                  <FeatureIconFive />
                </div>
                <h2>Bank Level Security</h2>
                <p>We utilizing banking level security to keep your account safe and secure.</p>
              </div>
            </li>
            <li>
              <div className='feature-content'>
                <div className='feature-icon'>
                  <FeatureIconSix />
                </div>
                <h2>Income Projections</h2>
                <p>
                  Track which investments are paying interest, dividends or royalties and create an income projection
                  schedule
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    fetchBlogs()
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading || !blogs?.length) {
    return <CircularSpinner />;
  }

  return (
    <div className='mm-container-right home-blog-section'>
      <div className='row'>
        <div className='col-lg-12 home-list blog-list'>
          <div className='blog-top-content'>
            <div className='blog-content-left'>
              <h1>Learn about investing platforms and strategies</h1>
              <p>
                <span className='block'>Visit our blog to learn about alternative investing,</span> diversifying your
                portfolio and crowdfunding.
              </p>
            </div>
            <div className='blog-content-right'>
              <a
                className='mm-nav-link'
                target='_blank'
                rel='noopener noreferrer'
                href='https://velocity.moneyminx.com'
              >
                <button className='mm-btn-animate bg-primary mm-btn-primary-outline'>Visit Blog</button>
              </a>
            </div>
          </div>

          <ul>
            {blogs.map((blog: any, index: number) => {
              const span = document.createElement('span');
              span.innerHTML = blog?.title?.rendered;
              const title = span.textContent || span.innerText;
              span.innerHTML = blog?.excerpt?.rendered;
              const excerpt = span.textContent || span.innerText;

              return (
                <li key={index}>
                  <div className='blog-content'>
                    <div className='blog-img'>
                      <img alt={blog?.slug} src={blog?.jetpack_featured_media_url || HomeBlogImgOne} />
                    </div>
                    <h2>
                      <a href={blog?.link || '/'} target='_blank' rel='noopener noreferrer'>
                        {title || ''}
                      </a>
                    </h2>
                    <p>{excerpt}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const HomeNetWorthSection = () => {
  return (
    <div className='mm-container-right home-networth networth-section'>
      <div className='row'>
        <div className='col-lg-5'>
          <div className='networth-text'>
            <p>
              <span className='highlighted-text'>A FEW of our many features</span>
            </p>
            <h1>Net Worth</h1>
            <p className='text'>
              Easy to use dashboard of your investments, assets, liabilities and net worth from all of your accounts,
              all in one modern, easy-to-use place.
            </p>
          </div>
        </div>
        <div className='col-lg-7'>
          <div className='networth-chart'>
            <HomeNetWorthChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeAllocationSection = () => {
  return (
    <div className='mm-container-right allocation-section'>
      <div className='networth-section rtl'>
        <div className='row'>
          <div className='col-lg-5'>
            <div className='networth-text'>
              <h1>Allocations</h1>
              <p className='text'>
                Always up to date asset allocation pie chart gives you a 360 degree view of your investments and how
                diversified your portfolio is. This at-a-glance visual give you immediate insight on where your money is
                and where to go next. It’s easily shareable too so you can get the insights from contacts you trust.
                (Click here to see Money Minx founder’s allocation chart.)
              </p>
            </div>
          </div>
          <div className='col-lg-7'>
            <div className='networth-chart'>
              <HomeAllocationChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomePerformanceSection = () => {
  return (
    <div className='mm-container-right performance-section'>
      <div className='networth-section'>
        <div className='row'>
          <div className='col-lg-5'>
            <div className='networth-text'>
              <h1>
                Performance<span className='above-tag-text'>Coming Soon!</span>
              </h1>
              <p className='text'>
                Easy to use dashboard of your investments, assets, liabilities and net worth, from all your
                institutions, all consolidated in one place.
              </p>
            </div>
          </div>
          <div className='col-lg-7'>
            <div className='networth-chart'>
              <HomePerformanceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MinxWinksSection = () => {
  return (
    <div className='mm-container-right minxwinks-section'>
      <div className='networth-section rtl'>
        <div className='row'>
          <div className='col-lg-5'>
            <div className='networth-text'>
              <h1>
                Minx Winks<span className='above-tag-text'>!Coming Soon</span>
              </h1>
              <p className='text'>
                Get inside insights, recommendations, and tips from Money Minx. Get inside insights, recommendations,
                and tips from Money Minx. Get inside insights, recommendations, and tips from Money Minx.
              </p>
            </div>
          </div>
          <div className='col-lg-7'>
            <div className='networth-chart'>
              <HomeMinxwinksImg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MinxMeasureSection = () => {
  return (
    <div className='mm-container-right minxmeasure-section'>
      <div className='networth-section'>
        <div className='row'>
          <div className='col-lg-5'>
            <div className='networth-text'>
              <h1>
                Minx Measure-up<span className='above-tag-text'>Coming Soon!</span>
              </h1>
              <p className='text'>
                Put your portfolio to the test against similar investors. How does yours stack up? What do you need to
                add? How can you further diversify?
              </p>
            </div>
          </div>
          <div className='col-lg-7'>
            <div className='networth-chart'>
              <HomeMinxMeasure />
            </div>
          </div>
          <div className='home-coming-soon'>
            <span className='highlighted-text'>And Much More Coming Soon!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
