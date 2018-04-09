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
      return { src: null, dragging: false, invalidSrc: null, invalidDst: null }
    }

    return {
      src: null,
      dragging: false,
      invalidSrc: null,
      invalidDst: null,
      pools: {
        ...state.pools,
        [state.src]: { value: state.pools[state.src].value - 1 },
        [dst]: { value: state.pools[dst].value + 1 }
      }
    }
  },
  over: ({ dst, limit }) => state => {
    return {
      invalidDst:
        state.dragging && dst != state.src && state.pools[dst].value == limit
          ? dst
          : null
    }
  }
}

export default actions
