import React from 'react';
import { SelectProps, OptionType } from '../component.type';

const SelectInput: React.FC<SelectProps> = ({
  name,
  title,
  value,
  options,
  helperText,
  handleChange,
  handleOnBlur,
  error = false,
}) => {
  const helperTextClass = error ? `show invalid-feedback` : `form-text text-muted`;
  const optionElem = options.map((option, index) => {
    return <Option key={index} value={option.value} name={option.name} />;
  });
  return (
    <div className='form-group pt-3'>
      <label htmlFor={name}>{title}</label>
      <select
        className='custom-select'
        name={name}
        onChange={handleChange}
        onBlur={handleOnBlur}
        value={value as string}
      >
        {optionElem}
      </select>
      {helperText && (
        <small id={`inputHelp-${name}`} className={helperTextClass}>
          {helperText}
        </small>
      )}
    </div>
  );
};

const Option: React.FC<OptionType> = ({ value, name }) => {
  return (
    <option value={value} role='button'>
      {name}
    </option>
  );
};

export default SelectInput;
