const actions = {
  startDrag: src => state => {
    return {
      src,
      dragging: true,
      invalidSrc: state.pools[src].value == 0 ? src : null
    }
  },
  stopDrag: ({ dst, limit }) => state => {
    if (
      state.pools[state.src].value == 0 ||
      state.pools[dst].value == limit ||
      dst == state.src
    ) {
      console.log('bailing out')
      return { src: null, dragging: false, src: null, dst: null }
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
  }
}

export default actions
