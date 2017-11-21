import React from 'react'
import { Field } from 'redux-form'
import Input from '../../components/Input'

const renderPhone = ({ fields, meta }) =>
  <ul className='formFields'>
    {fields.map((phone, i) =>
      <li key={i}>
        <Field
          name={`${phone}.number`}
          placeholder={`${i} -- Number`}
          component={Input}
        />
        <Field
          name={`${phone}.cell`}
          placeholder='Cell'
          component={Input}
        />
        <span onClick={() => fields.remove(i)}>
          <i className='material-icons'>remove circle</i>
        </span>
      </li>
    )}
    <li>
      <span onClick={() => fields.push({})}>
        <i className='material-icons'>add circle outline</i>
      </span>
    </li>
  </ul>

export default renderPhone
