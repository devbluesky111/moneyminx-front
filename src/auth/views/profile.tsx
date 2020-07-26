import React from 'react';
import { Formik } from 'formik';
import ProfileForm from './profile-form';
import { ProfilePayload } from 'auth/auth.types';
import DashboardLayout from 'layouts/dashboard.layout';
import { completeProfile } from 'auth/auth.service';
import { useAuthDispatch } from 'auth/auth.context';
import { toast } from 'react-toastify';

const initialValue: ProfilePayload = {
  name: '',
  photo: '',
  type: '',
  homeDelivery: true,
  phoneNumber: '',
  address: {
    addressLine1: 'Kathmandu',
    addressLine2: '',
    city: 'ktm',
    state: 'state3',
    country: 'Nepal',
    longitude: '121232',
    latitude: '12121212',
  },
};
const Profile = () => {
  const dispatch = useAuthDispatch();
  return (
    <DashboardLayout>
      <div className='pl-2 pt-2'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <h4 className='card-header'>{'Complete Your Profile'}</h4>
              <div className='card-body'>
                <Formik
                  initialValues={initialValue}
                  onSubmit={async (values, actions) => {
                    const { error } = await completeProfile({ dispatch, payload: values });
                    if (!error) {
                      actions.resetForm();
                      toast('Profile Updated Successfully', { type: 'success' });
                    } else {
                      toast(error.message ? JSON.stringify(error.message) : 'Something went wrong!!', {
                        type: 'error',
                      });
                    }
                  }}
                >
                  {(props) => <ProfileForm props={props} />}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
