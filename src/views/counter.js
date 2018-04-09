import { h } from 'hyperapp'

const clickCount = clicks => {
  return clicks > 0 ? (
    <div>
      You clicked {clicks} time{clicks > 1 ? 's' : ''}
    </div>
  ) : (
    ''
  )
}

const Button = ({ className, label, update, disabled, startDrag }) => (
  <button
    class={className}
    onmousedown={e => console.log('event', e.target)}
    disabled={disabled ? disabled : false}
  >
    {label}
  </button>
)

const view = (state, actions) => (
  <div class="counter">
    <h1>Welcome to HyperApp!</h1>
    <hr class="line-break" />
    <section>
      <Button className="add" label="++" />
    </section>
  </div>
)

export default view
