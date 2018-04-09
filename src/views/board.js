import { h } from 'hyperapp'

function Pool({
  name,
  startDrag,
  value,
  stopDrag,
  limit,
  invalidSrc,
  invalidDst,
  over
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
  const touchmove = touchWrap(target =>
    over({ dst: target.dataset.name, limit: target.dataset.limit })
  )
  const touchend = touchWrap(target =>
    stopDrag({ dst: target.dataset.name, limit: target.dataset.limit })
  )

  const className = [
    'pool',
    name.includes('Top') ? 'flip' : '',
    name,
    invalidSrc == name ? 'invalid-src' : '',
    invalidDst == name ? 'invalid-dst' : ''
  ].join(' ')

  return (
    <div
      class={className}
      data-name={name}
      data-limit={limit}
      onmousedown={() => startDrag(name)}
      onmouseup={() => stopDrag({ dst: name, limit })}
      onmouseover={() => over({ dst: name, limit })}
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

const view = (state, actions) => (
  <div class="counter">
    <Pool
      name="auraTop"
      limit={5}
      invalidSrc={state.invalidSrc}
      invalidDst={state.invalidDst}
      {...actions}
      {...state.pools.auraTop}
    />
    <Pool
      name="shadow"
      invalidSrc={state.invalidSrc}
      invalidDst={state.invalidDst}
      {...state.pools.shadow}
      {...actions}
    />
    <Pool
      name="distance"
      limit={10}
      invalidSrc={state.invalidSrc}
      invalidDst={state.invalidDst}
      {...actions}
      {...state.pools.distance}
    />
    <h1>{state.dragging ? 'Dragging' : ''}</h1>
  </div>
)

export default view
