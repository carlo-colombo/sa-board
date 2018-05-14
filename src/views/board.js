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

const view = ({ board }, actions) => {
  return (
    <div class={`board ${board.dragging ? 'dragging' : ''}`}>
      <PlayerArea player="Top" />
      <div class="common-area">
        <Pool name="shadow" renderer={Shadow} />
        <Pool name="distance" limit={10} renderer={Distance} />
      </div>
      <PlayerArea player="Bottom" />
    </div>
  )
}

export default view
