import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class Navigation extends Component {
  constructor (props) {
    super(props)

    this.renderNavigation = this.renderNavigation.bind(this)
    this.isActive = this.isActive.bind(this)
  }

  isActive (base, exact) {
    const { location } = this.props

    if (location.pathname.indexOf(base) === -1) return false

    if (exact) return location.pathname === base

    return true
  }

  renderNavigation () {
    const navArray = [
      {
        text: 'All contacts',
        link: '/',
        exact: true
      }, {
        text: 'My Favorites',
        link: '/favorites'
      }
    ]

    return navArray.map((elem, i) => (
      <li key={elem.text}>
        <Link
          to={elem.link}
          className={this.isActive(elem.link, elem.exact) ? 'active' : ''}>
          {elem.text}
        </Link>
      </li>
    ))
  }

  render () {
    return <nav className='navigation'>
      <ul>
        {this.renderNavigation()}
      </ul>
      <hr />
    </nav>
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(connect()(Navigation))
