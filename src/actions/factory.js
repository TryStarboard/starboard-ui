import mixpanel from '../mixpanel'
import {SYNC_REPOS} from '../../shared/action-types'

export function createSyncRepos(socket, store) {
  return function syncRepos() {
    mixpanel.track(SYNC_REPOS)
    socket.emit(SYNC_REPOS, {id: store.getState().user.id})
    return {
      type: SYNC_REPOS
    }
  }
}
