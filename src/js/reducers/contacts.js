import {
  ADD_NEW_CONTACT, CHANGE_FAVORITE_STATE, DELETE_CONTACT, SEARCH_CONTACTS, UPDATE_CONTACT
}
  from '../constants/actions'

const initialState = { filter: []}

const filterByValue = (array, string) => {
  if (!string.length) return []
  return array.filter(o => {
    return Object.keys(o).some(k => {
      if (location.pathname === '/favorites') {
        if (o.favorite) {
          if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase())
        }
      }else {
        if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase())
      }
      if (typeof o[k] === 'object') {
        return (filterByValue(Object.values(o[k]), string)).length
      }
    })
  })
}

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
    case SEARCH_CONTACTS:
      const data = state
      const filter = filterByValue(Object.values(data), action.text)
      return {
        ...state, filter
      }
    default:
      return state
  }
}
