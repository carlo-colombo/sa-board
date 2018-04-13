import './service-worker-registration'
import { app } from 'hyperapp'
import actions from './actions/board'
import state from './states/board'
import view from './views/board'
import { withLogger } from '@hyperapp/logger'

function persistLedger(nextApp) {
  return function(state, actions, view, elem) {
    state.ledger = JSON.parse(sessionStorage.getItem('ledger')) || state.ledger
    const newActions = {
      ...actions,
      stopDrag: dst => state => {
        const newState = actions.stopDrag(dst)(state)
        sessionStorage.setItem(
          'ledger',
          JSON.stringify({ ...state, ...newState }.ledger)
        )
        return newState
      },
      clear: () => () => sessionStorage.setItem('ledger', null)
    }
    return nextApp.call(null, state, newActions, view, elem)
  }
}

persistLedger(withLogger(app))(state, actions, view, document.body)
