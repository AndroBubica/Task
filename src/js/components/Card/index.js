import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeFavoriteState } from '../../actions/contatcs'
import ConfirmDialog from '../ConfirmDialog'

class Card extends Component {
  constructor (props) {
    super(props)

    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleView = this.handleView.bind(this)
  }

  handleFavorite () {
    const { dispatch, Id } = this.props
    dispatch(changeFavoriteState(Id))
  }

  handleEdit () {
    const { Id } = this.props
    this.props.history.push(`/contact/edit/${Id}`)
  }

  handleView () {
    const { Id } = this.props
    this.props.history.push(`/contact/${Id}`)
  }

  render () {
    const { cardInfo: {id, fullName, favorite} } = this.props
    return (
      <div className='cards-holder'>
        <div className='card'>
          <div className='card-actions'>
            <i className={favorite ? 'fa fa-heart' : 'fa fa-heart-o'}
              onClick={this.handleFavorite} />
            <i
              className='fa fa-pencil card_right'
              onClick={this.handleEdit} />
            <ConfirmDialog contactId={id} />
          </div>
          <div className='view-profile'
            onClick={this.handleView}>
            <img alt='Profile picture'
              src='https://placeimg.com/80/80/people' className='card_image' />
            <p>{fullName}</p>
          </div>
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
