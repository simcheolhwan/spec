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
  <article style={style.Page}>
    <header style={style.header}>
      <h1>{title}</h1>
      {!!actions.length && <section>{actions}</section>}
    </header>

    {children}
  </article>
)

Page.propTypes = propTypes
Page.defaultProps = defaultProps

const style = {
  Page: {
    padding: '2rem'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${colors.line}`,
    marginBottom: '1rem',
    paddingBottom: '.5rem'
  }
}

export default Page
