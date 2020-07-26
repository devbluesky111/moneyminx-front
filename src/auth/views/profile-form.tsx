import React from 'react';
import SubmitButton from 'common/components';
import { useTranslation } from 'react-i18next';
import Input from 'common/components/input/text.input';
import { OptionType } from 'common/components/component.type';
import SelectInput from 'common/components/input/select.input';
import { ProfileFormPayload, ProfilePayload } from 'auth/auth.types';

const deliveryOptions: OptionType[] = [
  {
    value: 1,
    name: 'Available',
  },
  {
    value: 0,
    name: 'Not Available',
  },
];

const ProfileForm: React.FC<ProfileFormPayload> = ({ props }) => {
  const { t } = useTranslation();

  const ct = (text: string) => t(`common.${text}`);

  const helpText = (field: keyof ProfilePayload) => {
    return error(field) ? error(field) : '';
  };

  const isValid = () => props.isValid && Object.values(props.values).some(Boolean);
  const error = (field: keyof ProfilePayload) =>
    props.touched[field] && props.values[field] && props.errors[field] ? props.errors[field] : undefined;

  return (
    <form onSubmit={props.handleSubmit}>
      <Input
        type='text'
        name='name'
        error={!!error('name')}
        title={ct('RESTAURANT_NAME')}
        handleOnBlur={props.handleBlur}
        placeholder={ct('RESTAURANT_NAME')}
        handleChange={props.handleChange}
        helperText={helpText('name') as string}
      />
      <Input
        type='text'
        name='photo'
        error={!!error('photo')}
        title={ct('PHOTO')}
        handleOnBlur={props.handleBlur}
        placeholder={ct('PHOTO')}
        handleChange={props.handleChange}
        helperText={helpText('photo') as string}
      />

      <Input
        type='text'
        name='type'
        error={!!error('type')}
        title={ct('RESTAURANT_TYPE')}
        handleOnBlur={props.handleBlur}
        placeholder={ct('RESTAURANT_TYPE')}
        handleChange={props.handleChange}
        helperText={helpText('type') as string}
      />

      <SelectInput
        name='homeDelivery'
        options={deliveryOptions}
        title={ct('HOME_DELIVERY')}
        error={!!error('homeDelivery')}
        handleOnBlur={props.handleBlur}
        handleChange={props.handleChange}
        helperText={helpText('homeDelivery') as string}
      />

      <Input
        type='text'
        name='phoneNumber'
        error={!!error('phoneNumber')}
        title={ct('PHONE_NUMBER')}
        handleOnBlur={props.handleBlur}
        placeholder={ct('PHONE_NUMBER')}
        handleChange={props.handleChange}
        helperText={helpText('phoneNumber') as string}
      />

      <SubmitButton loading={props.isSubmitting} text={ct('SAVE')} disabled={!isValid} />
    </form>
  );
};

export default ProfileForm;
