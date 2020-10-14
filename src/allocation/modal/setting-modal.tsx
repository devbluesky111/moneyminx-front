import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { Modal, ModalType } from 'common/components/modal';

import { ReactComponent as Copy } from '../../assets/icons/copy.svg';

interface SettingModalProps {
  settingModal: ModalType;
}

const SettingModal: React.FC<SettingModalProps> = ({ settingModal }) => {
  return (
    <Modal {...settingModal.props} title='' canBeClosed>
      <div className='modal-wrapper chart-setting-modal modal-md mm-setting-modal'>
        <div className='mm-setting-modal__title'>
          Chart Settings
          <Form>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label className='mm-setting-modal__sub-title'>Title</Form.Label>
              <Form.Control type='text' size='lg' placeholder='My super awesome allocation' />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='mm-setting-modal__sub-title'>Chart Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='My super awesome allocation. What do you guys think? Been thinking of adding Bitcoin.'
              />
            </Form.Group>
          </Form>
          <p>This will be shown on your profile page</p>
          <Card className='w-100 mm-setting-modal__card'>
            <Card.Body>
              <Card.Title className='mm-setting-modal__sub-title'>Show on your profile</Card.Title>
              <div className='d-flex justify-content-between'>
                <p>Anyone with this link can view the asset allocation chart</p>
                <span className='mm-switch-block'>
                  <input
                    value='true'
                    type='radio'
                    name='profileEnabled'
                    className='mm-switch-input'
                    aria-checked='true'
                  />
                  <label className='mm-switch mt-md-0 mt-3' role='button' />
                </span>
              </div>
              <Form.Control
                className='mm-url-link'
                size='lg'
                type='text'
                placeholder='https://moneyminx.com/profiles/hussein'
              />
              <span className='mm-copy-link'>
                <Copy />
              </span>
              <div className='d-flex my-3'>
                <label className='custom-checkbox mm-setting-modal-checkbox'>
                  <input type='checkbox' value='true' aria-checked='true' />
                  <span className='checkmark' />
                </label>
                <span className='checkbox-custom-label mm-setting-form-info'>
                  Get our diversified investor newsletter
                </span>
              </div>
              <div className='mm-setting-comming-soon text-center'>
                <p className='py-1'>Comming Soon!</p>
              </div>
            </Card.Body>
          </Card>
          <div>
            <div className='mm-setting-modal__sub-title'>Allocation style</div>
            <p>Which allocation style do you want displayed?</p>

            <div className='mm-plan-radios m-auto mt-2 text-nowrap'>
              <input
                type='radio'
                id='mm-allocation-type-modal'
                value='type'
                name='mm-radio-time-interval'
                aria-checked='true'
              />
              <label className='labels' htmlFor='mm-allocation-type-modal'>
                Type
              </label>
              <input
                type='radio'
                id='mm-allocation-asset-modal'
                value='annually'
                name='mm-radio-time-interval'
                aria-checked='false'
              />
              <label className='labels' htmlFor='mm-allocation-asset-modal'>
                Asset Class
              </label>
              <input
                type='radio'
                id='mm-allocation-country-modal'
                value='country'
                name='mm-radio-time-interval'
                aria-checked='false'
              />
              <label className='labels' htmlFor='mm-allocation-country-modal'>
                Location
              </label>
              <input
                type='radio'
                id='mm-allocation-risk-modal'
                value='risk'
                name='mm-radio-time-interval'
                aria-checked='false'
              />
              <label className='labels' htmlFor='mm-allocation-risk-modal'>
                Risk
              </label>
              <div className='mm-radio-bg' />
            </div>
          </div>
          <div className='mm-setting-modal__sub-title'>Show amounts?</div>
          <div className='d-flex justify-content-between'>
            <p>Do you want to show the value of each allocation?</p>
            <span className='mm-switch-block'>
              <input value='true' type='radio' name='profileEnabled' className='mm-switch-input' aria-checked='true' />
              <label className='mm-switch mt-md-0 mt-3' role='button' />
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingModal;
