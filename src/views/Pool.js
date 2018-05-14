import { h } from 'hyperapp'

export default function Pool({
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
  const label = name.replace(/(Top|Bottom)$/, '')

  const className = [
    'pool',
    'pool-' + name,
    'pool-' + label,
    value == 0 ? 'empty' : '',
    src == name && value == 0 ? 'invalid-src' : '',
    dst == name && value == limit ? 'invalid-dst' : ''
  ].join(' ')

  const defaultRenderer = (
    <div class="default-renderer pool-content">
      {label}: {value}/{limit ? limit : '∞'}
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
      {renderer ? renderer({ value, label, limit }) : defaultRenderer}
    </div>
  )
}
