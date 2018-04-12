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
      ...actions.reset()(),
      ledger: [...state.ledger, [state.src, dst]]
    }
  },
  over: dst => state => ({
    dst: state.dragging && dst != state.src ? dst : null
  }),
  reset: () => () => ({ src: null, dst: null, dragging: false })
}

export default actions
