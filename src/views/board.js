import { h } from 'hyperapp'

function Pool({ name, startDrag, value, stopDrag, limit, src, dst, over }) {
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
  const touchend = touchWrap(target => stopDrag(target.dataset.name))

  const className = [
    'pool',
    name.includes('Top') ? 'flip' : '',
    name,
    src == name && value == 0 ? 'invalid-src' : '',
    dst == name && value == limit ? 'invalid-dst' : ''
  ].join(' ')

  return (
    <div
      class={className}
      data-name={name}
      data-limit={limit}
      onmousedown={() => startDrag(name)}
      onmouseup={() => stopDrag({ dst: name, limit })}
      onmouseover={() => over(name)}
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
      src={state.src}
      dst={state.dst}
      {...actions}
      {...state.pools.auraTop}
    />
    <Pool
      name="shadow"
      src={state.src}
      dst={state.dst}
      {...state.pools.shadow}
      {...actions}
    />
    <Pool
      name="distance"
      limit={10}
      src={state.src}
      dst={state.dst}
      {...actions}
      {...state.pools.distance}
    />
    <h1>{state.dragging ? 'Dragging' : ''}</h1>
  </div>
)

export default view
