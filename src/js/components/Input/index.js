import React from 'react'
import PropTypes from 'prop-types'

const InputComponent = ({input, name, label, meta, iconName, placeholder, ...rest}) => {
  return (
    <div>
      {iconName && <i className='material-icons'>{iconName}</i>}
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input {...input} {...rest} id={name} placeholder={placeholder} />
      </div>
    </div>
  )
}

InputComponent.PropTypes = {
  iconName: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default InputComponent
