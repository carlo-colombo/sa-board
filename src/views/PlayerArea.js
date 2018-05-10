import { h } from 'hyperapp'
import Pool from './Pool.js'

export default function PlayerArea({ player, pools, board, actions }) {
  return (
    <div class={`player-area ${player == 'Top' ? 'flip' : ''}`}>
      <Pool
        name={`aura${player}`}
        limit={5}
        value={pools[`aura${player}`]}
        stopDrag={actions.stopDrag}
        {...board}
        {...actions.board}
      />
      <Pool
        name={`flare${player}`}
        value={pools[`flare${player}`]}
        stopDrag={actions.stopDrag}
        {...board}
        {...actions.board}
      />
      <Pool
        name={`life${player}`}
        value={pools[`life${player}`]}
        stopDrag={actions.stopDrag}
        {...board}
        {...actions.board}
      />
    </div>
  )
}
