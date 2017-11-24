import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import Input from '../../components/Input'
import ContactPhone from '../../components/ContactPhone'
import FileUpload from '../../components/FileUpload'
import ConfirmDialog from '../../components/ConfirmDialog'
import { updateContact } from '../../actions/contatcs'
import { isRequired } from '../../utils/validation'

class EditContact extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderMembers = this.renderMembers.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSubmit (values) {
    const { dispatch, match: {params}, favorite, stateImage } = this.props
    const url = values.image instanceof FileList ? URL.createObjectURL(values.image[0]) : stateImage
    let { image, ...rest } = values
    rest.image = url
    rest.id = Number(params.userId)
    rest.favorite = favorite

    dispatch(updateContact(params.userId, rest))
  }

  handleCancel (e) {
    e.preventDefault()
    this.props.history.push('/')
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
    const { handleSubmit, match: {params} } = this.props
    if (!Number.isInteger(+params.userId)) return <h2>not a valid number /:id</h2>

    return (
      <article>
        <form className='flex-container'
              onSubmit={handleSubmit(this.handleSubmit)}>
          <div className='flex left'>
            <Field
              name='image'
              component={FileUpload}
            />
          </div>
          <div className='flex right'>
            <div className='edit-action-icons'>
              <p className='rotate-icon'
                 onClick={this.props.history.goBack}
              ><i className="material-icons">subdirectory_arrow_right</i></p>
              <div>
                <ConfirmDialog contactId={Number(params.userId)} label='Delete' isReturn />
              </div>
            </div>
            <hr/>
            <Field
              name='fullName'
              label='full name'
              type='text'
              iconName='person'
              placeholder='Test'
              component={Input}
              validation={isRequired}
            />
            <hr/>
            <Field
              name='email'
              label='email'
              type='email'
              iconName='email'
              placeholder='Test'
              component={Input}
              validate={isRequired}
            />
            <hr/>
            <FieldArray
              name='numbers'
              component={ContactPhone} />
            <div className='buttons'>
              <button className='button-cancel' onClick={this.handleCancel}>Cancel</button>
              <button className='button-save' type='submit'>Save</button>
            </div>
          </div>
        </form>
      </article>
    )
  }
}

EditContact.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  if (Number.isInteger(+ownProps.match.params.userId))
    return ({
      stateImage: state.contacts[ownProps.match.params.userId].image,
      Id: state.contacts[ownProps.match.params.userId].id,
      initialValues: {
        fullName: state.contacts[ownProps.match.params.userId].fullName,
        email: state.contacts[ownProps.match.params.userId].email,
        numbers: state.contacts[ownProps.match.params.userId].numbers,
      }
    })
  return ({})
}
export default connect(mapStateToProps)(reduxForm({
  form: 'EditContactContact',
  onSubmitSuccess: (result, dispatch, props) => {
    props.history.goBack()
  }
})(EditContact))
