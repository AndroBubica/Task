import {
  ADD_NEW_CONTACT, CHANGE_FAVORITE_STATE, DELETE_CONTACT, UPDATE_CONTACT
}
  from '../constants/actions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CONTACT:
      return {
        ...state,
        [action.newContactData.id]: action.newContactData
      }
    case CHANGE_FAVORITE_STATE:
      return {
        ...state,
        [action.contactId]: {
          ...state[action.contactId],
          favorite: !state[action.contactId].favorite
        }
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        [action.updateId]: action.updatedValues
      }
    case DELETE_CONTACT:
      let { [action.deleteId.toString()]: deletedItem, ...rest } = state
      return rest
    default:
      return state
  }
}
