import axios from 'axios'
import validate from 'validate.js'
import Bluebird from 'bluebird'
import mixpanel from '../mixpanel'

import {LOGOUT, DELETE_ACCOUNT} from '../../shared/action-types'

export const GET_CURRENT_USER = 'GET_CURRENT_USER'
export const GET_ALL_REPOS = 'GET_ALL_REPOS'
export const GET_ALL_TAGS = 'GET_ALL_TAGS'
export const ADD_TAG = 'ADD_TAG'
export const CHNAGE_ADD_TAG_INPUT = 'CHNAGE_ADD_TAG_INPUT'
export const ADD_TAG_INVALID_INPUT = 'ADD_TAG_INVALID_INPUT'
export const ADD_TAG_RESET_MESSAGE = 'ADD_TAG_RESET_MESSAGE'
export const APPLY_TAG_TO_REPO = 'APPLY_TAG_TO_REPO'
export const BEGIN_DRAG_TAG = 'BEGIN_DRAG_TAG'
export const END_DRAG_TAG = 'END_DRAG_TAG'
export const DELETE_TAG = 'DELETE_TAG'
export const REMOVE_REPO_TAG = 'REMOVE_REPO_TAG'
export const SELECT_TAG = 'SELECT_TAG'
export const REMOVE_FILTER = 'REMOVE_FILTER'

export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER,
    payload: {
      promise: Bluebird.resolve(axios.get('/api/v1/me'))
        .tap(({data: user}) => mixpanel.identify(user.id))
    }
  }
}

export function getAllRepos() {
  return {
    type: GET_ALL_REPOS,
    payload: {
      promise: axios.get('/api/v1/repos')
    }
  }
}

export function getAllTags() {
  return {
    type: GET_ALL_TAGS,
    payload: {
      promise: axios.get('/api/v1/tags')
    }
  }
}

export function addTag(event) {
  event.preventDefault()

  return (dispatch, getState) => {
    const {ui: {tagInputValue: tagText}} = getState()

    mixpanel.track(ADD_TAG)

    const errors = validate({tag_text: tagText}, {tag_text: {presence: true}})

    if (errors != null) {
      dispatch({
        type: ADD_TAG_INVALID_INPUT,
        payload: errors.tag_text[0]
      })
    } else {
      dispatch({
        type: ADD_TAG,
        payload: {
          promise: axios.post('/api/v1/tags', {name: tagText})
        }
      })

      dispatch({
        type: ADD_TAG_RESET_MESSAGE
      })
    }
  }
}

export function changeAddTagInput(event) {
  return {
    type: CHNAGE_ADD_TAG_INPUT,
    payload: event.target.value
  }
}

export function applyTagToRepo(tagId, repoId) {
  mixpanel.track(APPLY_TAG_TO_REPO)
  return {
    type: APPLY_TAG_TO_REPO,
    payload: {
      data: {tag_id: tagId, repo_id: repoId},
      promise: axios.post('/api/v1/repo_tags', {tag_id: tagId, repo_id: repoId})
    }
  }
}

export function beginDragTag() {
  mixpanel.track(BEGIN_DRAG_TAG)
  return {
    type: BEGIN_DRAG_TAG
  }
}

export function endDragTag() {
  mixpanel.track(END_DRAG_TAG)
  return {
    type: END_DRAG_TAG
  }
}

export function deleteTag({tagId}) {
  mixpanel.track(DELETE_TAG)
  return {
    type: DELETE_TAG,
    payload: {
      data: {tagId},
      promise: axios.delete(`/api/v1/tags/${tagId}`)
    }
  }
}

export function removeRepoTag(repoTag) {
  mixpanel.track(REMOVE_REPO_TAG)
  return {
    type: REMOVE_REPO_TAG,
    payload: {
      data: repoTag,
      promise: axios.delete('/api/v1/repo_tags', {data: repoTag})
    }
  }
}

export function selectTag(tagId) {
  mixpanel.track(SELECT_TAG)
  return {
    type: SELECT_TAG,
    payload: {tagId}
  }
}

export function removeFilter(filterIndex) {
  mixpanel.track(REMOVE_FILTER)
  return {
    type: REMOVE_FILTER,
    payload: {filterIndex}
  }
}

export function logout() {
  mixpanel.track(LOGOUT)
  return {
    type: LOGOUT,
    payload: {
      promise: Bluebird
        .resolve(axios.get('/api/v1/logout'))
        .tap(() => {
          window.location = '/'
        })
    }
  }
}

export function deleteAccount() {
  mixpanel.track(DELETE_ACCOUNT)
  return {
    type: DELETE_ACCOUNT,
    payload: {
      promise: Bluebird
        .resolve(axios.delete('/api/v1/account'))
        .tap(() => {
          window.location = '/'
        })
    }
  }
}
