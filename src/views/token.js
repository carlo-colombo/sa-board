import { h } from 'hyperapp'

export default ({ visible }) => (
  <svg
    width="79.578mm"
    height="158.75mm"
    version="1.1"
    viewBox="0 0 79.578 158.75"
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%'
    }}
  >
    <g transform="translate(-13.128 -80.042)">
      <path
        d="m92.226 164.71c3.9811-28.587-18.143-84.667-18.143-84.667l-21.167 21.167-21.167-21.167s-22.124 56.08-18.143 84.667c3.8559 27.688 39.31 74.083 39.31 74.083s35.454-46.395 39.31-74.083z"
        fill={visible ? '#f5a5ad' : 'white'}
        stroke={!visible ? '#f5a5ad' : ''}
        image-rendering="auto"
      />
    </g>
  </svg>
)
