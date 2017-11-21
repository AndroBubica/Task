import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddContact from '../../components/AddContact'
import Card from '../../components/Card'

class AllContacts extends Component {
  constructor (props) {
    super(props)

    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.renderContacts = this.renderContacts.bind(this)
  }

  handleClick (link) {
    this.props.history.push(link)
  }

  handleCardClick (link) {
    this.handleClick(link)
  }

  renderContacts () {
    const { contacts } = this.props

    return Object.values(contacts).map((contact, i) =>
      <Card key={i} Id={contact.id} />
    )
  }

  render () {
    return (
      <section className='contacts'>
        <AddContact
          handleClick={() => this.handleCardClick('/addContact')}
        />
        {this.renderContacts()}
      </section>
    )
  }
}

AllContacts.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  contacts: state.contacts
}))(AllContacts)
