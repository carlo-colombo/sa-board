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

function augmentActions(actions, action, after) {
  return {
    ...actions,
    [action]: (...args) => state =>
      pipe(
        actions[action].apply(null, args),
        newState => ({ ...state, ...newState }),
        after
      )(state)
  }
}

const persist = (storage, key, action) => nextApp => (
  initialState,
  actions,
  view,
  elem
) => {
  const persistKey = state => (
    storage.setItem(key, JSON.stringify(state[key])),
    console.log(`persisted state['${key}'] into storage`),
    state
  )
  return nextApp(
    {
      ...initialState,
      [key]: JSON.parse(storage.getItem(key)) || initialState[key]
    },
    augmentActions(actions, action, persistKey),
    view,
    elem
  )
}

const updateUrl = nextApp => (initialState, actions, view, elem) => {
  const setHash = state => (
    (window.location.hash = btoa(JSON.stringify(state))),
    console.log(`updated hash`),
    state
  )
  return nextApp(
    JSON.parse(
      atob((window.location.hash.match(/#(.*)/) || [, 'ZmFsc2U='])[1])
    ) || initialState,
    augmentActions(
      augmentActions(actions, 'tapVigor', setHash),
      'dropToken',
      setHash
    ),
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

const setHash = nextApp => (initialState, actions, view, elem) => {
  return nextApp(initialState, actions, view, elem)
}

compose(
  persist(sessionStorage, 'ledger', 'dropToken'),
  persist(sessionStorage, 'vigor', 'tapVigor'),
  updateUrl,
  setHash,
  calculatePools,
  withLogger
)(app)(state, actions, view, document.body)
