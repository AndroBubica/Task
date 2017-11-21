import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from '../../container/Modal'
import Aux from 'react-aux'
import { deleteContact } from '../../actions/contatcs'
import './styles.scss'

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
    const { contactId, dispatch } = this.props
    dispatch(deleteContact(contactId))
    this.setState({showModal: false})

    this.props.history.push('/')
  }

  render () {
    const modal = this.state.showModal ? (
      <Modal>
        <div className='modal'>
          <p>Are you sure, you want to dleete this contact?</p>
          <button onClick={this.handleCancle}>Cancle</button>
          <button onClick={this.handleConfirm}>Confirm</button>
        </div>
      </Modal>
    ) : null

    return <Aux>
      <i className='material-icons'
         onClick={this.handleShow}>delete</i>
      {modal}
    </Aux>
  }
}

ConfirmDialog.propTypes = {
  contactId: PropTypes.number.isRequired
}

export default withRouter(connect()(ConfirmDialog))
