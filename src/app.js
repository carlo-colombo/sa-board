import './service-worker-registration'
import { app } from 'hyperapp'
import actions from './actions/board'
import state from './states/board'
import view from './views/board'
import { withLogger } from '@hyperapp/logger'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const pipe = (...fns) => compose(...fns.reverse())
const calculate = (ledger, startingPools) =>
  ledger.reduce(
    (acc, [from, to]) => ({
      ...acc,
      [from]: acc[from] - 1,
      [to]: acc[to] + 1
    }),
    startingPools
  )

const persistLedger = nextApp => (initialState, actions, view, elem) => {
  console.info('persistLedger')
  return nextApp(
    {
      ...initialState,
      ledger:
        JSON.parse(sessionStorage.getItem('ledger')) || initialState.ledger
    },
    {
      ...actions,
      stopDrag: dst => state => {
        const newState = actions.stopDrag(dst)(state)
        sessionStorage.setItem('ledger', JSON.stringify(newState.ledger))
        return newState
      },
      clear: () => () => sessionStorage.setItem('ledger', null)
    },
    view,
    elem
  )
}

const calculatePools = nextApp => (initialState, actions, view, elem) => {
  console.info('calculatePools')
  return nextApp(
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

compose(persistLedger, calculatePools, withLogger)(app)(
  state,
  actions,
  view,
  document.body
)
