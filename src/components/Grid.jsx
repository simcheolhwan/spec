import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../styles'

const propTypes = {
  aside: PropTypes.node.isRequired,
  main: PropTypes.node.isRequired
}

const Grid = ({ aside, main }) => [
  <aside style={style.aside} key="aside">
    {aside}
  </aside>,
  <main key="main">{main}</main>
]

Grid.propTypes = propTypes

const style = {
  aside: { backgroundColor: colors.silver, padding: '1rem 2rem' }
}

export default Grid
