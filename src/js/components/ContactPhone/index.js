import React from 'react'
import { Field } from 'redux-form'
import Aux from 'react-aux'
import Input from '../../components/Input'

const renderPhone = ({ fields, meta }) =>
  <Aux>
    <div className='icon-label'>
      <i className='material-icons'>phone</i>
      <label>numbers</label>
    </div>
    <ul className='form-fields'>
      {fields.map((phone, i) =>
        <li key={i}>
          <Field
            name={`${phone}.number`}
            placeholder='Number'
            component={Input}
          />
          <Field
            name={`${phone}.cell`}
            placeholder='Cell'
            component={Input}
          />
          <span onClick={() => fields.remove(i)}>
            <i className='fa fa-times-circle-o' />
          </span>
        </li>
      )}
      <li>
        <span onClick={() => fields.push({})}>
          <i className='material-icons'>add_circle_outline</i>
        Add number
      </span>
      </li>
    </ul>
  </Aux>

export default renderPhone
