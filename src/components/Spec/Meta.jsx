import React from 'react'
import { string, array, object, shape, func } from 'prop-types'
import { colors } from '../../styles'

const onDelete = func
const propTypes = {
  labels: shape({ list: array, onDelete }).isRequired,
  filename: shape({ filename: string, onDelete }),
  version: shape({ v: string, variant: object, onDelete })
}

const defaultProps = {
  filename: {},
  version: {}
}

const Labels = ({ list, onDelete }) =>
  list.map((label, index) => (
    <small style={style.label} onClick={() => onDelete(index)} key={label}>
      {label}
    </small>
  ))

const Filename = ({ filename, onDelete }) => (
  <code style={style.filename} onClick={() => onDelete(filename)}>
    {filename}
  </code>
)

const Version = ({ v, variant, onDelete }) => (
  <code style={{ ...style.version, ...variant }} onClick={() => onDelete(v)}>
    {v}
  </code>
)

const Meta = ({ labels, filename, version }) => [
  !!labels.list.length && <Labels {...labels} key="Labels" />,
  filename && <Filename {...filename} key="Filename" />,
  version.v && <Version {...version} key="Version" />
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
