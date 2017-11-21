import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles.scss'

import Input from '../../components/Input'
import ContactPhone from '../../components/ContactPhone'
import FileUpload from '../../components/FileUpload'
import { addNewContact } from '../../actions/contatcs'

class Addnew extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderMembers = this.renderMembers.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSubmit (values) {
    const { dispatch } = this.props
    const url = values.image instanceof FileList ? URL.createObjectURL(values.image[0]) : values.image
    let { image, ...rest } = values
    rest.image = url
    rest.id = new Date().getTime()
    rest.favorite = false

    dispatch(addNewContact(rest))
  }

  handleCancel (e) {
    e.preventDefault()
    this.props.history.goBack()
  }

  renderMembers () {
    const { fields } = this.props
    return (
      <ul>
        <li>
          <i className='material-icons'
            onClick={() => fields.push({})}>add circle outline</i>
        </li>
        {fields.map((phone, i) =>
          <li key={i}>
            <i className='material-icons'
              onClick={() => fields.remove(i)}>remove circle</i>
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
          </li>)}
      </ul>
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <section>
        <form
          className='ContactForm'
          onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            name='image'
            component={FileUpload}
          />
          <div className='formStyle'>
            <Field
              name='fullName'
              label='Test_label'
              type='text'
              iconName='person'
              placeholder='Test'
              component={Input}
            />
            <Field
              name='email'
              label='Test_label'
              type='text'
              iconName='email'
              placeholder='Test'
              component={Input}
            />
            <FieldArray name='numbers'
              myPersonalArrayProp={[]}
              component={ContactPhone} />
            <button onClick={this.handleCancel}>Cancel</button>
            <button type='submit'>Save</button>
          </div>
        </form>
      </section>
    )
  }
}

Addnew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object
}

export default connect(state => ({
  initialValues: {
    numbers: [{}]
  }
}))(reduxForm({
  form: 'addNewContact'
})(Addnew))
