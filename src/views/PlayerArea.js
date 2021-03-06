import { h } from 'hyperapp'
import Pool from './Pool.js'

const Vigor = ({ player }) => ({ vigor }, { tapVigor }) => {
  return (
    <div class="vigor bottom-side" onclick={() => tapVigor(player)}>
      <div class="vigor-title">vigor</div>
      <div class="vigor-content">{vigor[player]}</div>
    </div>
  )
}

const Actions = ({ player }) => (state, { resetState }) => (
  <div class="actions bottom-side">
    <div class="action" onclick={e => resetState()}>
      C
    </div>
    <div class="action">H</div>
  </div>
)

export default function PlayerArea({ player }) {
  return (
    <div class={`player-area ${player == 'Top' ? 'flip' : ''}`}>
      <Pool name={`aura${player}`} limit={5} />
      <Pool name={`flare${player}`} />
      <Actions player={player.toLowerCase()} />
      <Pool name={`life${player}`} />
      <Vigor player={player.toLowerCase()} />
    </div>
  )
}
