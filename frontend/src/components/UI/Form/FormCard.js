import React from 'react'
import PropTypes from 'prop-types';

function FormCard({ title, children, handleSubmit, buttonName }) {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card mt-5'>
            <div className='card-header'>
              <h3 className='text-center'>{ title }</h3>
            </div>
            <div className='card-body'>
              <form onSubmit={ handleSubmit }>
                { children }
                <div className='form-group text-center mt-3'>
                  <button type='submit' className='btn btn-primary'>{ buttonName }</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

FormCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
};

export default FormCard
