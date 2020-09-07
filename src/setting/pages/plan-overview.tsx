import React from 'react';
import { ReactComponent as CheckRound } from 'assets/icons/check-round.svg';

export const PlanOverview = () => {
  return (
    <section className='mm-plan-overview my-4'>
      <div className='mm-plan-overview__switch text-center'>
        <button type='button' className='mm-plan-overview__switch--btn btn btn-outline-primary'>
          Monthly
        </button>
        <button type='button' className='mm-plan-overview__switch--btn btn btn-outline-primary'>
          Annually
        </button>
      </div>

      <div className='row'>
        <div className='col-xl-6'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card mm-setting-card mm-plan-overview__card'>
                <div className='card-body'>
                  <div className='mm-plan-overview__card-title'>Early Adopter - VIP</div>
                  <div className='mm-plan-overview__card-title--sub'>$74 / month</div>
                  <hr />
                  <div className='mm-plan-overview__card-body'>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Unlimited connected accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Unlimited manual accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Current and historical asset allocation charts</p>
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
                      <p>VIP badge</p>
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
                    <button type='button' className='mm-plan-overview__plan-btn btn btn-outline-primary btn-lg'>
                      Change Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='card mm-setting-card mm-plan-overview__card mm-plan-overview__recommend-card'> {/* mm-plan-overview__recommend-card is only for recommend card, styles are written*/}
                <div className='card-body'>
                  <span className='mm-plan-overview__card-recommend'>RECOMMENDED</span>
                  <div className='mm-plan-overview__card-title'>Early Adopter - Pro</div>
                  <div className='mm-plan-overview__card-title--sub'>$22 / month</div>
                  <hr />
                  <div className='mm-plan-overview__card-body'>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>30 connected accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>30 manual accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Current and last 12 months asset allocation charts</p>
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
                      <p>Pro badge</p>
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
                    <button type='button' className='mm-plan-overview__plan-btn btn btn-primary btn-lg'>
                      Change Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card mm-setting-card mm-plan-overview__card'>
                <div className='card-body'>
                  <div className='mm-plan-overview__card-title'>Early Adopter - Plus</div>
                  <div className='mm-plan-overview__card-title--sub'>$14 / month</div>
                  <hr />
                  <div className='mm-plan-overview__card-body'>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>10 connected accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>10 manual accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Current and last 6 months asset allocation charts</p>
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
                      <p>Plus badge</p>
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
                    <button type='button' className='mm-plan-overview__plan-btn btn btn-outline-primary btn-lg'>
                      Change Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='card mm-setting-card mm-plan-overview__card'>
                <div className='card-body'>
                  <div className='mm-plan-overview__card-title'>Early Adopter - Green</div>
                  <div className='mm-plan-overview__card-title--sub'>$7 / month</div>
                  <hr />
                  <div className='mm-plan-overview__card-body'>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>5 connected accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>5 manual accounts</p>
                    </div>
                    <div className='d-flex align-items-lg-baseline py-2'>
                      <span className='mr-3'>
                        <CheckRound />
                      </span>
                      <p>Current and last 3 months asset allocation charts</p>
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
                      <p>Green badge</p>
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
                      className='mm-plan-overview__plan-btn mm-plan-overview__plan-btn--current btn btn-lg'
                    > {/* button for currnt plan only mm-plan-overview__plan-btn--current  */}
                      Current Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanOverview;
