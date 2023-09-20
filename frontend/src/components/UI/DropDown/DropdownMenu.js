import React from 'react'
import './DropDownMenu.css'
import PropTypes from 'prop-types';

function DropdownMenu({ isMenuVisible, children }) {
  return (
    <div>
      <div className={ `slide-out-menu ${ isMenuVisible ? 'show' : '' }` }>
        <div className='p-3'>
          { children }
        </div>
      </div>
    </div>
  )
}

DropdownMenu.propTypes = {
  isMenuVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default DropdownMenu
