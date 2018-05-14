import { h } from 'hyperapp'
import Pool from './Pool.js'

export default function PlayerArea({ player, pools }) {
  return (
    <div class={`player-area ${player == 'Top' ? 'flip' : ''}`}>
      <Pool name={`aura${player}`} pools={pools} limit={5} />
      <Pool name={`flare${player}`} pools={pools} />
      <Pool name={`life${player}`} pools={pools} />
    </div>
  )
}
