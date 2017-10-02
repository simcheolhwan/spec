import React from 'react'
import PropTypes from 'prop-types'
import { colors } from 'styles'

const propTypes = {
  labels: PropTypes.array,
  filename: PropTypes.string
}

const defaultProps = {
  labels: [],
  filename: ''
}

const Labels = ({ labels }) =>
  labels.map(label => (
    <small style={style.label} key={label}>
      {label}
    </small>
  ))

const Filename = ({ filename }) => (
  <code style={style.filename}>{filename}</code>
)

const Meta = ({ labels, filename }) => [
  !!labels.length && <Labels labels={labels} key="Labels" />,
  filename && <Filename filename={filename} key="Filename" />
]

Meta.propTypes = propTypes
Meta.defaultProps = defaultProps

const style = {
  label: {
    color: colors.white,
    borderRadius: 2,
    backgroundColor: colors.silver,
    marginLeft: '.25rem',
    padding: '0 .25rem'
  },

  filename: {
    backgroundColor: colors.silver,
    borderRadius: 2,
    color: colors.black,
    fontSize: '80%',
    marginLeft: '.5rem',
    padding: '0 .5rem'
  }
}

export default Meta
