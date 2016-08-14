import {bindActionCreators} from 'redux'
import {toPairs, pipe, filter, fromPairs, merge} from 'ramda'
import store from '../store'
import socket from '../websocket'
import * as creatorsAndTypes from './creators'
import {createSyncRepos} from './factory'

// Filter out actions types, which all start with upper case
//
const creators = pipe(
  toPairs,
  filter(([ name ]) => !/^[A-Z]/.test(name)),
  fromPairs,
  // Merge in actions creator factories
  merge({
    syncRepos: createSyncRepos(socket, store)
  })
)(creatorsAndTypes)

// Work around ES2015 static export
//
module.exports = bindActionCreators(creators, store.dispatch.bind(store))
