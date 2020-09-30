import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

import appEnv from 'app/app.env';
import { postSubscriptionCheckout } from 'api/request.api';
import useGetSubscription from 'auth/hooks/useGetSubscription';
import { pricingDetailConstant } from 'common/common.constant';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as CheckRound } from 'assets/icons/check-round.svg';

const stripePromise = loadStripe(appEnv.STRIPE_PUBLIC_KEY);

export const PlanOverview = () => {
  const [type, setType] = useState<string>('month');

  const { fetchingSubscription, subError, subscription } = useGetSubscription();
  const { fetchingCurrentSubscription, currentSubError, currentSubscription } = useCurrentSubscription();

  const loading = fetchingCurrentSubscription || fetchingSubscription || !subscription || subError || currentSubError;

  useEffect(() => {
    if (currentSubscription && subscription) {
      const currentType = subscription.find((sub: any) => sub.priceId === currentSubscription.priceId)?.duration;
      if (currentType) {
        setType(currentType);
      }
    }
  }, [currentSubscription, subscription]);

  if (loading) {
    return <CircularSpinner />;
  }

  const isCurrentPlan = (priceId: string) => currentSubscription.priceId === priceId;
  const ac = (priceId: string) => (isCurrentPlan(priceId) ? 'mm-plan-overview__plan-btn--current' : '');

  const changePlan = async (priceId: string) => {
    if (!priceId) {
      return toast('Price Id not found', { type: 'error' });
    }

    const stripe = await stripePromise;

    const payload = {
      subscriptionPriceId: priceId,
    };

    const { data, error } = await postSubscriptionCheckout(payload);
    if (error) {
      return toast('Can not stripe checkout id', { type: 'error' });
    }

    const checkoutId = data?.checkoutId;
    if (checkoutId && stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutId,
      });

      if (result.error) {
        return toast('Something went wrong with Stripe', { type: 'error' });
      }
    }
  };

  const monthlyPricingList = subscription?.filter((sub: any) => sub.duration === 'month');
  const annualPricingList = subscription?.filter((sub: any) => sub.duration === 'year');

  const btnClasses = 'mm-plan-overview__switch--btn btn btn-outline-primary';
  const planBtnClasses = 'mm-plan-overview__plan-btn btn btn-outline-primary btn-lg';

  const monthlyClasses = `${btnClasses} ${type === 'month' ? 'active' : ''}`;
  const annualClasses = `${btnClasses} ${type === 'year' ? 'active' : ''}`;

  const pricingList = type === 'month' ? monthlyPricingList : annualPricingList;

  return (
    <section className='mm-plan-overview my-4'>
      <div className='row mm-plan-overview__switch text-center'>
        <div className="mm-plan-radios m-auto">
            <input type="radio" id="mm-plan-radios1" value="monthly" name='mm-radio-time-interval' checked={type==='month'} />
            <label className="labels" htmlFor="mm-plan-radios1" onClick={() => setType('month')}>Monthly</label>
            <input type="radio" id="mm-plan-radios2" value="annually"  name='mm-radio-time-interval' checked={type==='year'} />
            <label className="labels" htmlFor="mm-plan-radios2" onClick={() => setType('year')}>Annually</label>
            <div className="mm-radion-bg"></div>
          </div>
      </div>

      <div className='row'>
        {pricingList?.map((pt: any, index: number) => {
          return (
            <div className='col-md-6 col-lg-3' key={index}>
              <div className='card mm-setting-card mm-plan-overview__card'>
                <div className='card-body'>
                  <div className='mm-plan-overview__card-title'>{pt.name}</div>
                  <div className='mm-plan-overview__card-title--sub'>
                    {type === 'yearly' ? `$${pt.price}/Year` : `$${pt.price}/Month`}
                    {type === 'yearly' ? <span className='save-percentage'>Save ${pt?.save}</span> : null}
                  </div>
                  <hr />
                  <div className='mm-plan-overview__card-body'>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>{pt.details[pricingDetailConstant.CONNECTED_ACCOUNT]} connected accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>{pt.details[pricingDetailConstant.MANUAL_ACCOUNT]} manual accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>
                        Current and{' '}
                        {pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY] === 'Unlimited'
                          ? 'historical'
                          : `last ${pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY]} months`}{' '}
                        asset allocation charts
                      </p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Sync across as many devices as you need</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Early Adopter badge</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>{pt.details[pricingDetailConstant.NAME]} badge</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>New features as being developed</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Early adopter access to founders</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Early adopter access to request new features for consideration</p>
                    </div>
                  </div>
                  <div className='mm-plan-overview__card-footer'>
                    <button
                      type='button'
                      className={`${planBtnClasses} ${ac(pt.priceId)}`}
                      onClick={() => changePlan(pt.priceId)}
                    >
                      {isCurrentPlan(pt.priceId) ? 'Current Plan' : 'Change Plan'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlanOverview;
