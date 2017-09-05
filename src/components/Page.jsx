import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../styles'

const propTypes = {
  title: PropTypes.string,
  variant: PropTypes.object,
  children: PropTypes.node
}

const defaultProps = {
  title: '',
  variant: {},
  children: null
}

const Page = ({ title, variant, children }) => (
  <article>
    <header
      style={{
        borderBottom: `1px solid ${colors.line}`,
        marginBottom: '1rem',
        paddingBottom: '1rem',
        ...variant
      }}
    >
      <h1>{title}</h1>
    </header>

    {children}
  </article>
)

Page.propTypes = propTypes
Page.defaultProps = defaultProps

export default Page
