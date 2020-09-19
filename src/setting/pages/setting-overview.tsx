import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { capitalize } from 'common/common-helper';
import { useModal } from 'common/components/modal';
import useSettings from 'setting/hooks/useSettings';
import SaveSettings from 'setting/inc/save-settings';
import ChangePasswordModal from 'setting/inc/change-password.modal';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { CurrentSubscription, SettingPageEnum } from 'setting/setting.type';
import SubscriptionCancelModal from 'setting/inc/subscription-cancel.modal';
import { patchCancelSubscription, patchEmailSubscription } from 'api/request.api';

interface SettingOverviewProps {
  changeTab: (pageName: SettingPageEnum) => void;
}

export const SettingOverview: React.FC<SettingOverviewProps> = ({ changeTab }) => {
  const changePasswordModal = useModal();
  const subscriptionCancelModal = useModal();
  const { loading, data, error } = useSettings();
  const [mailChimpSubscription, setMailChimpSubscription] = useState<boolean>(false);
  const { fetchingCurrentSubscription, currentSubscription } = useCurrentSubscription();
  const [cancelSubscriptionResponse, setCancelSubscriptionResponse] = useState<CurrentSubscription>();

  useEffect(() => {
    if (data) {
      setMailChimpSubscription(data.mailChimpSubscription);
    }
  }, [data]);

  if (error) {
    toast('Error on fetching settings');
  }

  if (loading || fetchingCurrentSubscription) {
    return <CircularSpinner />;
  }

  const handleCancelSubscription = async () => {
    const { error: patchError, data: response } = await patchCancelSubscription();

    if (!patchError) {
      return subscriptionCancelModal.open();
    }
    setCancelSubscriptionResponse(response);
  };

  const handleSave = async () => {
    const { error: pathError } = await patchEmailSubscription({ mailChimpSubscription });
    if (pathError) {
      return toast('Error on Adding Subscription', { type: 'error' });
    }
  };

  return (
    <section>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <form>
            <div className='mm-setting-card--title'>Preferences</div>
            <div className='mm-setting-form form-group mt-3 row'>
              <label className='col-sm-3 col-md-3'>Notification</label>
              <div className='col-sm-9 col-md-9'>
                <label className='custom-checkbox'>
                  <input
                    type='checkbox'
                    value='true'
                    checked={mailChimpSubscription}
                    aria-checked={mailChimpSubscription}
                    onChange={() => setMailChimpSubscription(!mailChimpSubscription)}
                  />
                  <span className='checkmark' />
                </label>
                <span className='checkbox-custom-label mm-setting-form-info'>
                  Get out diversified investor newsletter
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <form>
            <div className='mm-setting-card--title'>Security</div>
            <div className='mm-setting-form form-group row mt-3'>
              <label className='col-sm-3 col-md-3 col-form-label'>Email</label>
              <div className='col-sm-9 mb-4 col-md-9'>
                <input type='email' className='form-control' placeholder='Enter email' value='hussein@moneyminx.com' />
              </div>

              <label className='col-4 col-sm-3 col-md-3 col-form-label'>Password</label>
              <div className='col-8 col-sm-5 col-md-5 mb-4'>
                <input type='password' className='form-control mm-setting-form-pw' value='moneyminx' />
              </div>

              <div className='col'>
                <button type='button' className='btn btn-outline-primary mm-button float-right'>
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <form>
            <div className='mm-setting-card--title'>Subscription</div>
            <div className='mm-setting-form form-group row mt-3'>
              <div className='col-8 col-sm-3 col-md-3'>
                <label className=''>Current plan</label>
              </div>
              <div className='col-4 col-sm-5 col-md-5'>
                <span className='mm-setting-form-info ml-0 mb-4'>
                  {capitalize(currentSubscription?.subscriptionStatus || '')}
                </span>
              </div>
              <div className='col'>
                <button
                  type='button'
                  className='btn btn-outline-primary mm-button float-right'
                  onClick={() => changeTab(SettingPageEnum.PLAN)}
                >
                  Change Plan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <Link className='mm-setting-card--subscription' to='#' onClick={handleCancelSubscription}>
            Cancel subscription
          </Link>
        </div>
      </div>
      <ChangePasswordModal changePasswordModal={changePasswordModal} />
      <SubscriptionCancelModal
        subscriptionCancelModal={subscriptionCancelModal}
        subscriptionEnd={cancelSubscriptionResponse?.cancelAt || +currentSubscription?.cancelAt}
      />
      <SaveSettings handleSave={handleSave} />
    </section>
  );
};

export default SettingOverview;
