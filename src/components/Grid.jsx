import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  aside: PropTypes.node.isRequired,
  main: PropTypes.node.isRequired
}

const Grid = ({ aside, main }) => (
  <div style={style}>
    <aside style={style.aside}>{aside}</aside>
    <main>{main}</main>
  </div>
)

Grid.propTypes = propTypes

const style = {
  display: 'grid',
  gridTemplateColumns: '15rem 1fr',
  aside: { padding: '2rem', paddingRight: 0 }
}

export default Grid
