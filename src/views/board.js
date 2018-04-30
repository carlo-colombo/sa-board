import { h } from 'hyperapp'

import Token from './token.js'

function Pool({
  name,
  dragging,
  startDrag,
  value,
  stopDrag,
  limit,
  src,
  dst,
  over,
  reset,
  renderer
}) {
  const touchWrap = cb => e => {
    e.preventDefault()

    const [changedTouch] = event.changedTouches
    const target = document.elementFromPoint(
      changedTouch.clientX,
      changedTouch.clientY
    )
    return cb(target.closest('.pool'))
  }
  const touchmove = touchWrap(
    target => (dragging ? over(target.dataset.name) : null)
  )
  const touchend = touchWrap(
    target =>
      parseInt(target.dataset.value) < (target.dataset.limit || Infinity)
        ? stopDrag(target.dataset.name)
        : reset()
  )

  const mouseup = name => () =>
    value < (limit || Infinity) ? stopDrag(name) : reset()
  const mousedown = () => (value != 0 ? startDrag(name) : reset())

  const className = [
    'pool',
    'pool-' + name,
    name.includes('Top') ? 'flip' : '',
    value == 0 ? 'empty' : '',
    src == name && value == 0 ? 'invalid-src' : '',
    dst == name && value == limit ? 'invalid-dst' : ''
  ].join(' ')

  const defaultRenderer = (
    <div>
      {name}: {value}
      <br />
      limit: {limit}
    </div>
  )
  return (
    <div
      class={className}
      data-name={name}
      data-limit={limit}
      data-value={value}
      onmousedown={mousedown}
      onmouseup={mouseup(name)}
      onmouseover={() => (dragging ? over(name) : null)}
      ontouchstart={mousedown}
      ontouchend={touchend}
      ontouchmove={touchmove}
    >
      {renderer ? renderer({ value }) : defaultRenderer}
    </div>
  )
}

const Distance = ({ value }) => {
  const steps = new Array(10).fill().map((v, i) => {
    const offset = (10 - value) / 2
    const classes = [
      'step',
      i + 1 <= value + offset && i + 1 > offset ? 'fill' : '',
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
      <div class="player-area flip">
        <Pool
          name="auraTop"
          limit={5}
          value={pools.auraTop}
          stopDrag={actions.stopDrag}
          {...board}
          {...actions.board}
        />

        <Pool
          name="lifeTop"
          value={pools.lifeTop}
          stopDrag={actions.stopDrag}
          {...board}
          {...actions.board}
        />
        <Pool
          name="flareTop"
          value={pools.flareTop}
          stopDrag={actions.stopDrag}
          {...board}
          {...actions.board}
        />
      </div>
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
      <h1>{board.dragging ? 'Dragging' : ''}</h1>
    </div>
  )
}

export default view
