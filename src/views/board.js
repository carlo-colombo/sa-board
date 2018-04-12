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
  reset
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
      target.dataset.value < (parseInt(target.dataset.limit) || Infinity)
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
      {name}: {value}
      <br />
      limit: {limit}
    </div>
  )
}

const view = (state, actions) => {
  const pools = state.ledger.reduce(
    (acc, [from, to]) => ({
      ...acc,
      [from]: acc[from] - 1,
      [to]: acc[to] + 1
    }),
    state.pools
  )

  return (
    <div class={`counter ${state.dragging ? 'dragging' : ''}`}>
      <Pool
        name="auraTop"
        limit={5}
        src={state.src}
        dst={state.dst}
        dragging={state.dragging}
        value={pools.auraTop}
        {...actions}
      />
      <Pool
        name="shadow"
        src={state.src}
        dst={state.dst}
        dragging={state.dragging}
        value={pools.shadow}
        {...actions}
      />
      <Pool
        name="distance"
        limit={10}
        src={state.src}
        dst={state.dst}
        dragging={state.dragging}
        value={pools.distance}
        {...actions}
      />
      <h1>{state.dragging ? 'Dragging' : ''}</h1>
      <button onclick={actions.clear}>clear</button>
    </div>
  )
}

export default view
