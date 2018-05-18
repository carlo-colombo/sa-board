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

function augmentActions(actions, storage, key, [action, ...rest], getState) {
  if (rest.length > 0) {
    return {
      ...actions,
      [action]: augmentActions(actions[action], storage, key, rest, getState)
    }
  } else {
    return {
      ...actions,
      [action]: function(...args) {
        return state =>
          pipe(
            actions[action].apply(null, args),
            newState => ({ ...state, ...newState }),
            state => (
              storage.setItem(key, JSON.stringify(getState(state))),
              console.log(`persisted ${key} into storage`),
              state
            )
          )(state)
      },
      clear: () => () => storage.setItem(key, null)
    }
  }
}

const persist = (storage, key, action, getState = x => x) => nextApp => (
  initialState,
  actions,
  view,
  elem
) => {
  return nextApp(
    {
      ...initialState,
      [key]: JSON.parse(storage.getItem(key)) || initialState[key]
    },
    augmentActions(actions, storage, key, action, getState),
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

compose(
  persist(sessionStorage, 'ledger', ['dropToken'], state => state.ledger),
  persist(sessionStorage, 'vigor', ['vigor', 'tap']),
  calculatePools,
  withLogger
)(app)(state, actions, view, document.body)
