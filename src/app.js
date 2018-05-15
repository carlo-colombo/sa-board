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

const persistLedger = storage => nextApp => (
  initialState,
  actions,
  view,
  elem
) => {
  return nextApp(
    {
      ...initialState,
      ledger: JSON.parse(storage.getItem('ledger')) || initialState.ledger
    },
    {
      ...actions,
      dropToken: dst => state =>
        pipe(
          actions.dropToken(dst),
          newState => ({ ...state, ...newState }),
          state => (
            storage.setItem('ledger', JSON.stringify(state.ledger)), state
          ),
          state => (
            console.log('persisted ledger, length: ', state.ledger.length),
            state
          )
        )(state),
      clear: () => () => storage.setItem('ledger', null)
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
      dropToken: dst => state =>
        pipe(
          actions.dropToken(dst),
          newState => ({ ...state, ...newState }),
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

compose(persistLedger(sessionStorage), calculatePools, withLogger)(app)(
  state,
  actions,
  view,
  document.body
)
