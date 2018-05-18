const state = {
  pools: {
    distance: 10,
    shadow: 0,
    lifeTop: 8,
    lifeBottom: 8,
    auraTop: 3,
    auraBottom: 3,
    flareTop: 0,
    flareBottom: 0
  },
  board: {
    dragging: false,
    src: null,
    dst: null
  },
  ledger: [],
  vigor: {
    top: 0,
    bottom: 1
  }
}

export default state
