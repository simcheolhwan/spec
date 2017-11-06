import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../styles'

const propTypes = {
  labels: PropTypes.shape({
    list: PropTypes.array,
    onDelete: PropTypes.func
  }).isRequired,
  filename: PropTypes.string
}

const defaultProps = {
  filename: ''
}

const Labels = ({ list, onDelete }) =>
  list.map((label, index) => (
    <small style={style.label} onClick={() => onDelete(index)} key={label}>
      {label}
    </small>
  ))

const Filename = ({ filename }) => (
  <code style={style.filename}>{filename}</code>
)

const Version = ({ version }) => <code style={style.version}>{version}</code>

const Meta = ({ labels, filename, version }) => [
  !!labels.list.length && <Labels {...labels} key="Labels" />,
  filename && <Filename filename={filename} key="Filename" />,
  version && <Version version={version} key="Version" />
]

Meta.propTypes = propTypes
Meta.defaultProps = defaultProps

export const style = {
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
  },

  version: {
    border: `1px solid ${colors.silver}`,
    borderRadius: 2,
    fontSize: '80%',
    marginLeft: '.5rem',
    padding: '0 .5rem'
  }
}

export default Meta
