import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const rootModal = document.getElementById('modal')

class Modal extends Component {
  constructor (props) {
    super(props)

    this.el = document.createElement('div')
  }

  componentDidMount () {
    rootModal.appendChild(this.el)
  }

  componentWillUnmount () {
    rootModal.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

export default Modal
