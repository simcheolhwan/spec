import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../styles'

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

const defaultProps = {
  title: '',
  children: null
}

const Page = ({ title, children }) => (
  <article style={style.Page}>
    <header style={style.header}>
      <h1>{title}</h1>
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
    borderBottom: `1px solid ${colors.line}`,
    marginBottom: '1rem',
    paddingBottom: '.5rem'
  }
}

export default Page
