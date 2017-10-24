import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../styles'

const propTypes = {
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node
}

const defaultProps = {
  title: '',
  actions: [],
  children: null
}

const Page = ({ title, actions, children }) => (
  <article style={style}>
    <header style={style.header}>
      <h1>{title}</h1>
      {!!actions.length && <section>{actions}</section>}
    </header>

    <main style={style.main}>{children}</main>
  </article>
)

Page.propTypes = propTypes
Page.defaultProps = defaultProps

const style = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 'none',
    borderBottom: `1px solid ${colors.line}`,
    padding: '1rem 2rem'
  },

  main: {
    padding: '1rem 2rem',
    overflow: 'scroll'
  }
}

export default Page
