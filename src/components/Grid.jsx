import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  aside: PropTypes.node.isRequired,
  main: PropTypes.node.isRequired
}

const Grid = ({ aside, main }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '15rem 1fr' }}>
    <aside style={{ padding: '2rem', paddingRight: 0 }}>{aside}</aside>
    <main>{main}</main>
  </div>
)

Grid.propTypes = propTypes

export default Grid
