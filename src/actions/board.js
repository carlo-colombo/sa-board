const actions = {
  startDrag: src => state => ({
    src,
    dragging: true
  }),
  stopDrag: dst => state => {
    if (dst == state.src && state.src != null) {
      console.log('bailing out')
      return actions.reset()()
    }

    return {
      src: null,
      dragging: false,
      src: null,
      dst: null,
      pools: {
        ...state.pools,
        [state.src]: state.pools[state.src] - 1,
        [dst]: state.pools[dst] + 1
      },
      ledger: [...state.ledger, [state.src, dst]]
    }
  },
  over: dst => state => ({
    dst: state.dragging && dst != state.src ? dst : null
  }),
  reset: () => () => ({ src: null, dst: null, dragging: false })
}

export default actions
