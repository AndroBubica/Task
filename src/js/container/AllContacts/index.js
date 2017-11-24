import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Aux from 'react-aux'

import Menu from '../Menu'
import AddContact from '../../components/AddContact'
import Card from '../../components/Card'
import { searchContacts } from '../../actions/contatcs'

class AllContacts extends Component {
  constructor (props) {
    super(props)

    this.state = { inputText: '' }

    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.renderContacts = this.renderContacts.bind(this)
    this.renderFilter = this.renderFilter.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleClick (link) {
    this.props.history.push(link)
  }

  handleCardClick (link) {
    this.handleClick(link)
  }

  renderContacts () {
    const { contacts: { filter, ...data } } = this.props

    return Object.values(data).map((contact, i) =>
      this.renderCard(i, contact.id, contact.favorite)
    )
  }

  renderFilter () {
    const { contacts: { filter } } = this.props

    return filter.map((contact, i) =>
      this.renderCard(i, contact.id, contact.favorite)
    )
  }



  renderCard (index, id, favorite) {
    const { location } = this.props

    if (location.pathname === '/favorites') {
      if (favorite)
        return <Card key={index} Id={id}/>
    } else {
      return <Card key={index} Id={id}/>
    }
  }

  handleSearch (e) {
    const { dispatch }  = this.props

    this.setState({ inputText: e.target.value })
    dispatch(searchContacts(e.target.value))
  }

  render () {
    const { location } = this.props

    return (
      <Aux>
        <Menu />
        <label htmlFor='search' className='search' id="search-label">
          <i className='material-icons'>search</i>
          <input value={this.state.inputText}
                 type="text" id="search" onChange={this.handleSearch}/>
        </label>
        <section>
          {
            !(location.pathname === '/favorites') && <AddContact
              handleClick={() => this.handleCardClick('/contact/add')}
            />
          }
          {
            this.state.inputText.length
              ? this.renderFilter()
              : this.renderContacts()
          }
        </section>
      </Aux>
    )
  }
}

AllContacts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(connect(state => ({
  contacts: state.contacts,
  filter: state.contacts.filter
}))(AllContacts))
