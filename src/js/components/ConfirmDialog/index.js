import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from '../../container/Modal'
import Aux from 'react-aux'
import { deleteContact } from '../../actions/contatcs'

class ConfirmDialog extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleCancle = this.handleCancle.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleShow () {
    this.setState({showModal: true})
  }

  handleCancle () {
    this.setState({showModal: false})
  }

  handleConfirm () {
    const { contactId, dispatch, isReturn } = this.props
    dispatch(deleteContact(contactId))
    this.setState({showModal: false})

    isReturn && this.props.history.push('/')
  }

  render () {
    const { label } = this.props
    const modal = this.state.showModal ? (
      <Modal>
        <div className='modal'>
          <h1>Delete</h1>
          <hr />
          <div className='modal-main'>
            <p>
              Are you sure, you want to delete this contact?
            </p>
            <div className='buttons'>
              <button className='button-cancel' onClick={this.handleCancle}>Cancle</button>
              <button className='button-save' onClick={this.handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </Modal>
    ) : null

    return <Aux>
      <label>{label}
        <i className='fa fa-trash-o delete-action'
          onClick={this.handleShow} />
      </label>
      {modal}
    </Aux>
  }
}

ConfirmDialog.propTypes = {
  contactId: PropTypes.number.isRequired,
  label: PropTypes.string,
  isReturn: PropTypes.bool
}

export default withRouter(connect()(ConfirmDialog))
