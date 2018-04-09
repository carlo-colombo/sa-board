const actions = {
  startDrag: src => state => {
    return {
      src,
      dragging: true,
      invalidSrc: state.pools[src].value == 0 ? src : null
    }
  },
  stopDrag: dst => state => {
    if (state.pools[state.src].value == 0 || dst == state.src) {
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
        [state.src]: { value: state.pools[state.src].value - 1 },
        [dst]: { value: state.pools[dst].value + 1 }
      }
    }
  },
  over: dst => state => {
    return {
      dst: state.dragging && dst != state.src ? dst : null
    }
  },
  reset: () => state => ({ src: null, dst: null, dragging: false })
}

export default actions
