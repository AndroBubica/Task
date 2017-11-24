import {
  ADD_NEW_CONTACT, CHANGE_FAVORITE_STATE, DELETE_CONTACT,
  SEARCH_CONTACTS, UPDATE_CONTACT
}
  from '../constants/actions'

export const addNewContactSuccess = newContactData => ({
  type: ADD_NEW_CONTACT,
  newContactData
})

export const changeFavoriteStateSuccess = contactId => ({
  type: CHANGE_FAVORITE_STATE,
  contactId
})

export const deleteContactSuccess = deleteId => ({
  type: DELETE_CONTACT,
  deleteId
})

export const updateContactSuccess = (updateId, updatedValues) => ({
  type: UPDATE_CONTACT,
  updateId,
  updatedValues
})

export const searchContactsSuccess = text => ({
  type: SEARCH_CONTACTS,
  text
})

export const addNewContact = values =>
  dispatch =>
    dispatch(addNewContactSuccess(values))

export const changeFavoriteState = id =>
  dispatch =>
    dispatch(changeFavoriteStateSuccess(id))

export const deleteContact = id =>
  dispatch =>
    dispatch(deleteContactSuccess(id))

export const updateContact = (id, values) =>
  dispatch =>
    dispatch(updateContactSuccess(id, values))

export const searchContacts = id =>
  dispatch =>
    dispatch(searchContactsSuccess(id))
