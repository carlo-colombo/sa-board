const actions = {
  board: {
    startDrag: src => () => ({
      src,
      dragging: true
    }),
    over: dst => ({ dragging, src }) => ({
      dst: dragging && dst != src ? dst : null
    }),
    reset: () => () => ({ src: null, dst: null, dragging: false })
  },
  dropToken: dst => ({ board: { src }, ledger }) => {
    if (dst == src || src == null || dst == null) {
      console.log('bailing out')
      return { board: actions.board.reset()() }
    }

    return {
      board: actions.board.reset()(),
      ledger: [...ledger, [src, dst]]
    }
  },
  tapVigor: player => state => ({
    ...state,
    vigor: {
      ...state.vigor,
      [player]: (state.vigor[player] + 1) % 3
    }
  })
}

export default actions
