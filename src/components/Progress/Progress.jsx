import React from 'react'
import PropTypes from 'prop-types'
import './Progress.css'

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  variant: PropTypes.object
}

const defaultProps = {
  size: 18,
  color: 'black',
  variant: {}
}

const Progress = ({ size, color, variant }) => (
  <div style={{ ...style.container, width: size, height: size, ...variant }}>
    <div style={{ ...style.wrapper, borderColor: color }}>
      <div style={style.side}>
        <div style={spin.left} />
      </div>
      <div style={style.center}>
        <div style={spin.center} />
      </div>
      <div style={style.side}>
        <div style={spin.right} />
      </div>
    </div>
  </div>
)

Progress.propTypes = propTypes
Progress.defaultProps = defaultProps

const style = {
  container: {
    animation: 'container-rotate 1568ms linear infinite',
    display: 'inline-block',
    lineHeight: 0
  },

  wrapper: {
    width: '100%',
    height: '100%',
    animation:
      'fill-unfill-rotate 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both'
  },

  side: {
    display: 'inline-block',
    position: 'relative',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    borderColor: 'inherit'
  },

  center: {
    position: 'absolute',
    top: 0,
    left: '45%',
    width: '10%',
    height: '100%',
    overflow: 'hidden',
    borderColor: 'inherit'
  },

  spin: {
    width: '200%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: '100%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'inherit',
    borderBottomColor: 'hsla(0, 0%, 0%, 0)',
    borderRadius: '50%'
  }
}

const spin = {
  left: {
    ...style.spin,
    animation: 'left-spin 1333ms cubic-bezier(0.4,0.0,0.2,1) infinite both',
    borderRightColor: 'hsla(0, 0%, 0%, 0)',
    transform: 'rotate(129deg)'
  },

  center: {
    ...style.spin,
    width: '1000%',
    left: '-450%'
  },

  right: {
    ...style.spin,
    animation: 'right-spin 1333ms cubic-bezier(0.4,0.0,0.2,1) infinite both',
    borderLeftColor: 'hsla(0, 0%, 0%, 0)',
    left: '-100%',
    transform: 'rotate(-129deg)'
  }
}

export default Progress
