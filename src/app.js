import './service-worker-registration'
import { app } from 'hyperapp'
import actions from './actions/board'
import state from './states/board'
import view from './views/board'
import { withLogger } from '@hyperapp/logger'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const pipe = (...fns) => compose(...fns.reverse())
const calculate = ledger =>
  ledger.reduce(
    (acc, [from, to]) => ({
      ...acc,
      [from]: acc[from] - 1,
      [to]: acc[to] + 1
    }),
    state.pools
  )

const persistLedger = nextApp => (initialState, actions, view, elem) => {
  console.log(elem, view)
  return nextApp(
    {
      ...initialState,
      ledger:
        JSON.parse(sessionStorage.getItem('ledger')) || initialState.ledger
    },
    {
      ...actions,
      stopDrag: dst => state =>
        pipe(
          actions.stopDrag(dst),
          state => (
            sessionStorage.setItem('ledger', JSON.stringify(state.ledger)),
            state
          ),
          state => (
            console.log('persisted ledger, length: ', state.ledger.length),
            state
          )
        )(state),
      clear: () => () => sessionStorage.setItem('ledger', null)
    },
    view,
    elem
  )
}

const calculatePools = nextApp => (initialState, actions, view, elem) => {
  return nextApp(
    {
      ...initialState,
      pools: calculate(initialState.ledger)
    },
    {
      ...actions,
      stopDrag: dst => state =>
        pipe(
          actions.stopDrag(dst),
          state => ({
            ...state,
            pools: calculate(state.ledger)
          }),
          state => (console.log('calculated pools: ', state.pools), state)
        )(state)
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
