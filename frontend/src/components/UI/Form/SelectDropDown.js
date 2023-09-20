import React from 'react'
import './selectdropdown.css'
import PropTypes from 'prop-types';

function SelectDropdown({ id, name, options, handleChange, selectedValue = '', classes = '' }) {
  return (
    <div className={ `py-1 form-group ${ classes }` }>
      <select
        id={ id }
        name={ name }
        className='form-control'
        required
        onChange={ handleChange }
        value={ selectedValue }
      >
        <option disabled>
          Select Your { name }
        </option>
        {options && options.map((option, index) => (
            <option key={ index } value={ option.id }>
              { option.name }
            </option>
          ))}
      </select>
    </div>
  )
}

SelectDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  classes: PropTypes.string,
};

export default SelectDropdown
