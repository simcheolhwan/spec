import React from 'react'
import { node } from 'prop-types'
import { colors } from '../styles'

const propTypes = { aside: node, main: node.isRequired }
const defaultProps = { aside: null }

const Grid = ({ aside, main }) => [
  aside && (
    <aside style={style.aside} key="aside">
      {aside}
    </aside>
  ),
  <main style={style.main} key="main">
    {main}
  </main>
]

Grid.propTypes = propTypes
Grid.defaultProps = defaultProps

const style = {
  aside: { backgroundColor: colors.silver, padding: '1rem 2rem' },
  main: { overflow: 'hidden', display: 'flex' }
}

export default Grid
