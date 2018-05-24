const calculate = (ledger, pools) =>
  ledger.reduce(
    (acc, [from, to]) => ({
      ...acc,
      [from]: acc[from] - 1,
      [to]: acc[to] + 1
    }),
    pools
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

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

const pipe = (...fns) => compose(...fns.reverse())

export const persist = (storage, key, action) => nextApp => (
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

export const resetPersistentState = (storage, ...keys) => nextApp => (
  initialState,
  actions,
  view,
  elem
) => {
  return nextApp(
    initialState,
    {
      ...actions,
      resetState: () => () => {
        if (confirm('Do you want to reset state?')) {
          keys.forEach(k => storage.removeItem(k))
          window.location.hash = ''
          window.location.reload()
        }
      }
    },
    view,
    elem
  )
}
export const updateUrl = nextApp => (initialState, actions, view, elem) => {
  const setHash = state => {
    const { pools, vigor } = state
    window.location.hash = btoa(JSON.stringify({ pools, vigor }))
    console.log(`updated hash, ${window.location.hash.length}`)
    return state
  }

  const hash =
    window.location.hash != '' &&
    JSON.parse(atob(window.location.hash.match(/#(.*)/)[1]))

  return nextApp(
    hash
      ? { ...initialState, ...hash, initialPools: hash.pools, ledger: [] }
      : initialState,
    augmentActions(
      augmentActions(actions, 'tapVigor', setHash),
      'dropToken',
      setHash
    ),
    view,
    elem
  )
}

export const calculatePools = nextApp => (
  initialState,
  actions,
  view,
  elem
) => {
  return nextApp(
    {
      ...initialState,
      pools: calculate(initialState.ledger, initialState.initialPools)
    },
    {
      ...actions,
      dropToken: dst => state =>
        pipe(
          actions.dropToken(dst),
          newState => ({ ...state, ...newState }),
          state => ({
            ...state,
            pools: calculate(state.ledger, state.initialPools)
          }),
          state => (console.log('calculated pools: ', state.pools), state)
        )(state)
    },
    view,
    elem
  )
}
