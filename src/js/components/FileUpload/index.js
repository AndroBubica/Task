import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

export const backgroundStyle = (value) => {
  if (!value) return {}
  if (value.length === 0) return {}
  const url = value instanceof FileList ? URL.createObjectURL(value[0]) : value
  return {
    background: `url(${url}) center/cover no-repeat`
  }
}

const FileUpload = (props) => {
  const { image, input: { value, ...input }, icon } = props
  return (
    <div>
      <label>
        <div
          className='image'
          style={backgroundStyle(value || image)}>
          {!value && !image &&
          <i className='material-icons icon'>{icon}</i>
          }
          <input
            className='file'
            type='file'
            {...input}
          />
        </div>
      </label>
    </div>
  )
}

FileUpload.defaultProps = {
  input: {},
  meta: {},
  circle: true,
  icon: 'file_upload'
}

FileUpload.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
}

export default FileUpload
