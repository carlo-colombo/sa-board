import { h } from 'hyperapp'
import Pool from './Pool.js'

export default function PlayerArea({ player, pools }) {
  return (
    <div class={`player-area ${player == 'Top' ? 'flip' : ''}`}>
      <Pool name={`aura${player}`} limit={5} />
      <Pool name={`flare${player}`} />
      <Pool name={`life${player}`} />
    </div>
  )
}
