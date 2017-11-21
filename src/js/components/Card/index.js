import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeFavoriteState } from '../../actions/contatcs'
import ConfirmDialog from '../ConfirmDialog'

import './styles.scss'

class Card extends Component {
  constructor (props) {
    super(props)

    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleFavorite () {
    const { dispatch, Id } = this.props
    dispatch(changeFavoriteState(Id))
  }

  handleEdit () {
    const { Id } = this.props
    this.props.history.push(`/contact/edit/${Id}`)
  }

  render () {
    const { cardInfo: {id, fullName, favorite} } = this.props
    return (
      <div className='wrap-contact'>
        <div className='Card'>
          <div className='card_actions'>
            <i className={['material-icons', favorite && 'isFavorite', 'actions'].join(' ')}
              onClick={this.handleFavorite}>favorite</i>
            <i
              className='material-icons card_right'
              onClick={this.handleEdit}>border_color</i>
            <ConfirmDialog contactId={id} />
          </div>
          <img src='http://via.placeholder.com/80x80' className='card_image' />
          <p>{fullName}</p>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  Id: PropTypes.number
}

export default withRouter(connect((state, ownProps) => ({
  cardInfo: state.contacts[ownProps.Id]
}))(Card))
