import React from 'react'
import PropTypes from 'prop-types'

const AddContact = ({ handleClick }) =>
  <div className='cards-holder'>
    <div
      onClick={handleClick}
      className='card firstCard'>
      <i className='material-icons'>add</i>
      <span>Add new</span>
    </div>
  </div>

AddContact.propTypes = {
  handleClick: PropTypes.func.isRequired
}
export default AddContact
