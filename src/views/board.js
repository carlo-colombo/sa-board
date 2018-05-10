import { h } from 'hyperapp'
import Token from './token.js'
import PlayerArea from './PlayerArea.js'
import Pool from './Pool.js'

const Distance = ({ value }) => {
  const steps = new Array(10).fill().map((v, i) => {
    const offset = (10 - value) / 2
    const classes = [
      'step',
      i + 1 <= value + offset && i + 1 > offset ? 'fill' : 'empty',
      `step${i}`
    ].join(' ')
    return (
      <div class={classes} key={i + 1}>
        <Token />
      </div>
    )
  })

  return <div class="distance">{steps}</div>
}

const view = ({ ledger, board, pools: startingPools }, actions) => {
  const pools = ledger.reduce(
    (acc, [from, to]) => ({
      ...acc,
      [from]: acc[from] - 1,
      [to]: acc[to] + 1
    }),
    startingPools
  )

  return (
    <div class={`board ${board.dragging ? 'dragging' : ''}`}>
      <PlayerArea player="Top" pools={pools} board={board} actions={actions} />
      <div class="common-area">
        <Pool
          name="shadow"
          value={pools.shadow}
          stopDrag={actions.stopDrag}
          {...board}
          {...actions.board}
        />
        <Pool
          name="distance"
          limit={10}
          value={pools.distance}
          stopDrag={actions.stopDrag}
          renderer={Distance}
          {...board}
          {...actions.board}
        />
      </div>
      <PlayerArea
        player="Bottom"
        pools={pools}
        board={board}
        actions={actions}
      />
    </div>
  )
}

export default view
