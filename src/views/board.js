import { h } from 'hyperapp'

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
  function touchstart(e) {
    e.preventDefault()
    return startDrag(name)
  }

  const touchWrap = cb => e => {
    e.preventDefault()

    const [changedTouch] = event.changedTouches
    const target = document.elementFromPoint(
      changedTouch.clientX,
      changedTouch.clientY
    )
    return cb(target)
  }
  const touchmove = touchWrap(target => over(target.dataset.name))
  const touchend = touchWrap(
    target =>
      parseInt(target.dataset.value) < (target.dataset.limit || Infinity)
        ? stopDrag(target.dataset.name)
        : reset()
  )

  const className = [
    'pool',
    'pool-' + name,
    name.includes('Top') ? 'flip' : '',
    value == 0 ? 'empty' : '',
    src == name && value == 0 ? 'invalid-src' : '',
    dst == name && value == limit ? 'invalid-dst' : ''
  ].join(' ')

  const mouseup = name => () =>
    value < (limit || Infinity) ? stopDrag(name) : reset()
  const mousedown = name => () => (value != 0 ? startDrag(name) : reset())

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
      onmousedown={mousedown(name)}
      onmouseup={mouseup(name)}
      onmouseover={() => (dragging ? over(name) : null)}
      ontouchstart={touchstart}
      ontouchend={touchend}
      ontouchmove={touchmove}
    >
      {renderer ? renderer({ value }) : defaultRenderer}
    </div>
  )
}

const Distance = ({ value }) => {
  const steps = new Array(10).fill().map((v, i) => {
    const classes = ['step', i + 1 <= value ? 'fill' : '', `step${i}`].join(' ')
    return <div class={classes} key={i + 1} />
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
      <button onclick={actions.clear}>clear</button>
      <Pool
        name="auraTop"
        limit={5}
        value={pools.auraTop}
        {...board}
        stopDrag={actions.stopDrag}
        {...actions.board}
      />
      <Pool
        name="shadow"
        value={pools.shadow}
        {...board}
        stopDrag={actions.stopDrag}
        {...actions.board}
      />
      <Pool
        name="distance"
        limit={10}
        value={pools.distance}
        {...board}
        stopDrag={actions.stopDrag}
        {...actions.board}
        renderer={Distance}
      />
      <h1>{board.dragging ? 'Dragging' : ''}</h1>
    </div>
  )
}

export default view
