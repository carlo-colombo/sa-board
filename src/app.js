import './service-worker-registration'
import { app } from 'hyperapp'
import actions from './actions/board'
import state from './states/board'
import view from './views/board'
import { withLogger } from '@hyperapp/logger'

function storePools(nextApp) {
  return function(state, actions, view, elem) {
    state.pools = JSON.parse(sessionStorage.getItem('pools')) || state.pools
    const newActions = {
      ...actions,
      stopDrag: dst => state => {
        const newState = actions.stopDrag(dst)(state)
        sessionStorage.setItem('pools', JSON.stringify(newState.pools))
        return newState
      },
      clear: () => () => sessionStorage.setItem('pools', null)
    }
    return nextApp.call(null, state, newActions, view, elem)
  }
}

storePools(withLogger(app))(state, actions, view, document.body)
