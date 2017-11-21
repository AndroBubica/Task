import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const AddContact = ({ handleClick }) =>
  <div className='wrap-contact'>
    <div
      onClick={handleClick}
      className='AddContact'>
      <i className='material-icons'>add</i>
      <span>Add new</span>
    </div>
  </div>

AddContact.propTypes = {
  handleClick: PropTypes.func.isRequired
}
export default AddContact
