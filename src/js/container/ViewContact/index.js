import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeFavoriteState } from '../../actions/contatcs'

class ViewContact extends Component {
  constructor (props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.renderNumber = this.renderNumber.bind(this)
  }

  handleEdit () {
    const { Id } = this.props
    this.props.history.push(`/contact/edit/${Id}`)
  }

  handleFavorite () {
    const { dispatch, Id } = this.props
    dispatch(changeFavoriteState(Id))
  }

  renderNumber () {
    const { numbers } = this.props
    if (!numbers) return {}

    return (
      <div className='icon-label view-contact numbers'>
        <i className='material-icons'>phone</i>
        <label>numbers</label>
        <div>
          {numbers.map((number, i) =>
            <span key={i}>
              <p>{number.cell}</p>
              <p> {number.number}</p>
            </span>)}
        </div>
      </div>
    )
  }

  render () {
    const { match: {params}, favorite, fullName, email } = this.props
    if (!Number.isInteger(+params.userId)) return <h2>not a valid number /:id</h2>

    return (
      <article>
        <div className='flex-container'>
          <div className='flex left'>
            <div
              className='image'
              style={{background: 'url(https://placeimg.com/180/180/people) center/cover no-repeat'}} />
          </div>
          <div className='flex right'>
            <div className='edit-action-icons'>
              <p className='rotate-icon '
                onClick={this.props.history.goBack}
              ><i className='material-icons'>subdirectory_arrow_right</i></p>
              <h1>{fullName}</h1>
              <div>
                <i className={[favorite ? 'fa fa-heart' : 'fa fa-heart-o', 'favorite-icon'].join(' ')}
                  onClick={this.handleFavorite} />
                <i
                  className='fa fa-pencil card_right'
                  onClick={this.handleEdit} />
              </div>
            </div>
            <hr />
            <div className='icon-label view-contact'>
              <i className='material-icons'>email</i>
              <label>email</label>
              <p>{email}</p>
            </div>
            {this.renderNumber()}
          </div>
        </div>
      </article>
    )
  }
}

ViewContact.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  if (Number.isInteger(+ownProps.match.params.userId)) {
    return ({
      Id: state.contacts[ownProps.match.params.userId].id,
      image: state.contacts[ownProps.match.params.userId].image,
      fullName: state.contacts[ownProps.match.params.userId].fullName,
      email: state.contacts[ownProps.match.params.userId].email,
      numbers: state.contacts[ownProps.match.params.userId].numbers,
      favorite: state.contacts[ownProps.match.params.userId].favorite
    })
  }
  return ({})
}
export default connect(mapStateToProps)(ViewContact)
