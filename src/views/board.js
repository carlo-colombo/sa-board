import { h } from 'hyperapp'
import Token from './token.js'
import PlayerArea from './PlayerArea.js'
import Pool from './Pool.js'

const Distance = ({ value }) => {
  const steps = new Array(10).fill().map((v, i) => {
    const offset = (10 - value) / 2
    const visible = i + 1 <= value + offset && i + 1 > offset
    const classes = ['step', `step${i}`, i % 2 == 0 ? 'flip' : ''].join(' ')

    return (
      <div class={classes} key={i + 1}>
        <Token visible={visible} />
      </div>
    )
  })

  return <div class="distance pool-content">{steps}</div>
}

const Shadow = ({ value, label, limit }) => {
  const text = `${label}: ${value}/${limit ? limit : '∞'}`
  return (
    <div class="pool-content shadow-renderer">
      <div>{text}</div>
      <div class="flip">{text}</div>
    </div>
  )
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
          renderer={Shadow}
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
