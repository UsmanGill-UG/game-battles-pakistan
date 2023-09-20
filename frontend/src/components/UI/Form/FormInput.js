import React from 'react'
import PropTypes from 'prop-types';

function FormInput({ handleChange, handleBlur, buttonDisable, ...props }) {
  return (
    <div className='py-1 form-group'>
      <input
        className='form-control'
        onChange={ handleChange }
        onBlur={ handleBlur }
        disabled={ buttonDisable }
        { ...props }
      />
    </div>
  )
}

FormInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  buttonDisable: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormInput
