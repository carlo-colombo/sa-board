import './service-worker-registration'
import { app } from 'hyperapp'
import actions from './actions/board'
import state from './states/board'
import view from './views/board'
import { withLogger } from '@hyperapp/logger'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const calculate = (ledger, startingPools) =>
  ledger.reduce(
    (acc, [from, to]) => ({
      ...acc,
      [from]: acc[from] - 1,
      [to]: acc[to] + 1
    }),
    startingPools
  )

function persistLedger(nextApp) {
  console.info('persistLedger')
  return function(initialState, actions, view, elem) {
    const newActions = {
      ...actions,
      stopDrag: dst => state => {
        const newState = actions.stopDrag(dst)(state)
        sessionStorage.setItem('ledger', JSON.stringify(newState.ledger))
        return newState
      },
      clear: () => () => sessionStorage.setItem('ledger', null)
    }
    return nextApp.call(
      null,
      {
        ...initialState,
        ledger:
          JSON.parse(sessionStorage.getItem('ledger')) || initialState.ledger
      },
      newActions,
      view,
      elem
    )
  }
}

function reduceLedger(nextApp) {
  console.info('reduceLedger')
  return function(initialState, actions, view, elem) {
    return nextApp.call(
      null,
      {
        ...initialState,
        pools: calculate(initialState.ledger, initialState.pools)
      },
      {
        ...actions,
        stopDrag: dst => state => {
          const newState = actions.stopDrag(dst)(state)
          return {
            ...newState,
            pools: calculate(newState.ledger, initialState.pools)
          }
        }
      },
      view,
      elem
    )
  }
}

compose(persistLedger, reduceLedger, withLogger)(app)(
  state,
  actions,
  view,
  document.body
)
